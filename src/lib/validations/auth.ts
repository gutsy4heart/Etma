import { z } from "zod";

// Функция для создания схемы с переводами
export const createSignUpSchema = (t: (key: string, values?: any) => string) => z.object({
  name: z
    .string()
    .min(2, t('auth.validation.name.minLength', { min: 2 }))
    .max(50, t('auth.validation.name.maxLength', { max: 50 }))
    .regex(/^[a-zA-Zа-яА-Я\s]+$/, t('auth.validation.name.invalid')),
  
  email: z
    .string()
    .min(1, t('auth.validation.email.required'))
    .email(t('auth.validation.email.invalid')),
  
  password: z
    .string()
    .min(8, t('auth.validation.password.minLength', { min: 8 }))
    .max(100, t('auth.validation.password.maxLength', { max: 100 }))
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      t('auth.validation.password.invalid')
    ),
  
  confirmPassword: z
    .string()
    .min(1, t('auth.validation.confirmPassword.required')),
  
  terms: z
    .boolean()
    .refine((val) => val === true, t('auth.validation.terms.required'))
}).refine((data) => data.password === data.confirmPassword, {
  message: t('auth.validation.confirmPassword.mismatch'),
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>;
