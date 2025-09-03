import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя не должно превышать 50 символов")
    .regex(/^[a-zA-Zа-яА-Я\s]+$/, "Имя может содержать только буквы и пробелы"),
  
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Введите корректный email адрес"),
  
  password: z
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .max(100, "Пароль не должен превышать 100 символов")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Пароль должен содержать минимум одну строчную букву, одну заглавную букву и одну цифру"
    ),
  
  confirmPassword: z
    .string()
    .min(1, "Подтверждение пароля обязательно"),
  
  terms: z
    .boolean()
    .refine((val) => val === true, "Необходимо принять условия использования")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
