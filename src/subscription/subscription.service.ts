import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { EmailService } from "src/shared/services/email.service";
import { Repository } from "typeorm";
import { SubscriptionDto } from "./dtos/create.dto";
import { PatchSubscriptionDto } from "./dtos/patch.dto";
import { Sub } from "./subscription.entity";

@Injectable()
export class SubService
  extends BaseService<Sub, SubscriptionDto, PatchSubscriptionDto>
  implements ICrudService<Sub, SubscriptionDto, PatchSubscriptionDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Sub)
    repository: Repository<Sub>,
    private readonly emailService: EmailService,
  ) {
    super(repository, apiFeaturesService);
  }

  async create(createDto: SubscriptionDto): Promise<Sub> {
    const subscription = this.repository.create({
      email: createDto.email,
    });

    const savedSubscription = await this.repository.save(subscription);

    // إرسال رسالة ترحيب للعميل
    try {
      const welcomeHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; background: linear-gradient(135deg, #B22947 0%, #3D2545 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">مرحباً بك! 🌟</h1>
          </div>
          
          <div style="background: #FFF5E9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #E6A238;">
            <p style="font-size: 16px; line-height: 1.6; color: #3D2545; margin-bottom: 20px;">
              شكراً لك على الاشتراك في قائمتنا البريدية! 
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #3D2545; margin-bottom: 20px;">
              سنقوم بإرسال أحدث العروض والأخبار المثيرة إليك قريباً. 
              كن على استعداد للحصول على أفضل الصفقات! 🛍️
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #E6A238; margin: 20px 0; box-shadow: 0 2px 8px rgba(230, 162, 56, 0.1);">
              <h3 style="color: #B22947; margin-top: 0;">ما يمكنك توقعه:</h3>
              <ul style="color: #3D2545; line-height: 1.8;">
                <li>✨ عروض حصرية وعروض خاصة</li>
                <li>🆕 إشعارات عن المنتجات الجديدة</li>
                <li>💝 نصائح وحيل للتسوق الذكي</li>
                <li>🎁 فرص للفوز بجوائز رائعة</li>
              </ul>
            </div>
            
            <p style="font-size: 14px; color: #3D2545; margin-top: 30px;">
              إذا كان لديك أي أسئلة، لا تتردد في التواصل معنا.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #B22947; font-weight: bold; font-size: 16px;">
                فريق العمل 🚀
              </p>
            </div>
          </div>
        </div>
      `;

      await this.emailService.sendOrderConfirmationEmail(
        createDto.email,
        "مرحباً بك في قائمتنا البريدية! 🎉",
        welcomeHtml,
      );
    } catch (error) {
      console.error("Failed to send welcome email:", error);
      // لا نريد أن نفشل الاشتراك لو فشل إرسال الإيميل
    }

    return savedSubscription;
  }
}
