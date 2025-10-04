// Server-side Secrets Vault
// Secure storage and retrieval of API keys and sensitive configuration

import { createHash, createCipheriv, createDecipheriv, randomBytes } from 'crypto';

// Simple in-memory store (in production, you'd use a database)
interface SecretEntry {
  key: string;
  value: string;
  encrypted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class SecretsVault {
  private static instance: SecretsVault;
  private secrets: Map<string, SecretEntry> = new Map();
  private encryptionKey: string;

  private constructor() {
    // In production, this would be a proper master key
    this.encryptionKey = process.env.SECRETS_MASTER_KEY || 'sungaze-default-key-change-in-prod';
    this.initializeDefaults();
  }

  public static getInstance(): SecretsVault {
    if (!SecretsVault.instance) {
      SecretsVault.instance = new SecretsVault();
    }
    return SecretsVault.instance;
  }

  private initializeDefaults() {
    // Migrate existing environment variables
    const envKeys = [
      'OPENAI_API_KEY',
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'NEXT_PUBLIC_ELEVENLABS_API_KEY',
      'NEXT_PUBLIC_ELEVENLABS_VOICE_ID'
    ];

    envKeys.forEach(key => {
      const value = process.env[key];
      if (value && !this.secrets.has(key)) {
        this.setSecret(key, value);
      }
    });
  }

  private encrypt(text: string): string {
    const iv = randomBytes(16);
    const key = createHash('sha256').update(this.encryptionKey).digest();
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  private decrypt(encryptedText: string): string {
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = createHash('sha256').update(this.encryptionKey).digest();
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  public async setSecret(key: string, value: string, encrypt: boolean = true): Promise<void> {
    const secretEntry: SecretEntry = {
      key,
      value: encrypt ? this.encrypt(value) : value,
      encrypted: encrypt,
      createdAt: this.secrets.has(key) ? this.secrets.get(key)!.createdAt : new Date(),
      updatedAt: new Date()
    };

    this.secrets.set(key, secretEntry);
    console.log(`Secret ${key} ${this.secrets.has(key) ? 'updated' : 'stored'} securely`);
  }

  public async getSecret(key: string): Promise<string | null> {
    const secret = this.secrets.get(key);
    if (!secret) {
      console.warn(`Secret ${key} not found`);
      return null;
    }

    return secret.encrypted ? this.decrypt(secret.value) : secret.value;
  }

  public async deleteSecret(key: string): Promise<boolean> {
    const deleted = this.secrets.delete(key);
    if (deleted) {
      console.log(`Secret ${key} deleted`);
    }
    return deleted;
  }

  public listSecretKeys(): string[] {
    return Array.from(this.secrets.keys());
  }

  public getSecretInfo(key: string): Omit<SecretEntry, 'value'> | null {
    const secret = this.secrets.get(key);
    if (!secret) return null;

    return {
      key: secret.key,
      encrypted: secret.encrypted,
      createdAt: secret.createdAt,
      updatedAt: secret.updatedAt
    };
  }

  public async rotateSecret(key: string, newValue: string): Promise<void> {
    if (!this.secrets.has(key)) {
      throw new Error(`Secret ${key} does not exist`);
    }
    
    await this.setSecret(key, newValue);
    console.log(`Secret ${key} rotated successfully`);
  }
}

// Singleton instance
const vault = SecretsVault.getInstance();

// Public API
export const getSecret = (key: string): Promise<string | null> => vault.getSecret(key);
export const setSecret = (key: string, value: string, encrypt?: boolean): Promise<void> => vault.setSecret(key, value, encrypt);
export const deleteSecret = (key: string): Promise<boolean> => vault.deleteSecret(key);
export const rotateSecret = (key: string, newValue: string): Promise<void> => vault.rotateSecret(key, newValue);
export const listSecrets = (): string[] => vault.listSecretKeys();
export const getSecretInfo = (key: string) => vault.getSecretInfo(key);

// Server-only exports
export { SecretsVault };