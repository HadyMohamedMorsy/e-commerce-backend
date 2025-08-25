import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GeneralSettings extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Store Information
  @Column({ nullable: true })
  store_name: string;

  @Column({ nullable: true })
  store_email: string;

  @Column({ nullable: true })
  store_phone: string;

  @Column({ nullable: true, type: "text" })
  store_address: string;

  // Currency and Payment Settings
  @Column({ nullable: true })
  default_currency: string;

  @Column({ nullable: true })
  currency_symbol: string;

  @Column({ nullable: true, type: "decimal", precision: 5, scale: 2 })
  tax_rate: number;

  // Shipping Settings
  @Column({ nullable: true })
  shipping_days: number;

  // Google Tag Manager
  @Column({ nullable: true })
  gtm_container_id: string;

  @Column({ nullable: true })
  google_analytics_id: string;

  @Column({ nullable: true })
  facebook_pixel_id: string;

  @Column({ nullable: true })
  snapchat_pixel_id: string;

  @Column({ nullable: true })
  init_tiktok_id: string;

  // Omnisend Integration
  @Column({ nullable: true })
  omnisend_api_key: string;

  @Column({ nullable: true, default: false })
  omnisend_enabled: boolean;

  @Column({ nullable: true, default: false })
  gtm_enabled: boolean;

  @Column({ nullable: true, default: false })
  google_analytics_enabled: boolean;

  @Column({ nullable: true, default: false })
  facebook_pixel_enabled: boolean;

  @Column({ nullable: true, default: false })
  snapchat_pixel_enabled: boolean;

  @Column({ nullable: true, default: false })
  init_tiktok_enabled: boolean;

  // Social Media
  @Column({ nullable: true })
  facebook_url: string;

  @Column({ nullable: true })
  instagram_url: string;

  @Column({ nullable: true })
  twitter_url: string;

  // SEO Settings
  @Column({ nullable: true })
  meta_title: string;

  @Column({ nullable: true, type: "text" })
  meta_description: string;

  // Email Settings
  @Column({ nullable: true })
  smtp_host: string;

  @Column({ nullable: true })
  smtp_port: number;

  @Column({ nullable: true })
  smtp_email: string;

  @Column({ nullable: true })
  smtp_password: string;

  // Maintenance Mode
  @Column({ nullable: true, default: false })
  maintenance_mode: boolean;

  @Column({ nullable: true, type: "text" })
  maintenance_message: string;

  // Google OAuth Settings
  @Column({ nullable: true })
  client_id_google: string;

  @Column({ nullable: true })
  client_secret_google: string;

  @Column({ nullable: true })
  client_callback_url_google: string;

  // Facebook OAuth Settings
  @Column({ nullable: true })
  client_id_facebook: string;

  @Column({ nullable: true })
  client_secret_facebook: string;

  @Column({ nullable: true })
  client_callback_url_facebook: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  createdBy: User;
}
