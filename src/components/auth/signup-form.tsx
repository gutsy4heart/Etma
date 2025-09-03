"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import { Eye, EyeOff, Github } from "lucide-react";
import Link from "next/link";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      // Здесь будет логика регистрации
      console.log("Form data:", data);
      
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // После успешной регистрации
      reset();
      alert("Регистрация прошла успешно!");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Произошла ошибка при регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Создать аккаунт</h1>
        <p className="text-gray-600">Зарегистрируйтесь, чтобы начать</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Имя */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Имя
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Введите ваше имя"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Введите ваш email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Пароль */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Пароль
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Введите пароль"
              {...register("password")}
              className={errors.password ? "border-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Подтверждение пароля */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Подтвердите пароль
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Подтвердите пароль"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Согласие с условиями */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              {...register("terms")}
              className="rounded border-gray-300"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Я согласен с{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                условиями использования
              </Link>{" "}
              и{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                политикой конфиденциальности
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms.message}</p>
          )}
        </div>

        {/* Кнопка отправки */}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Регистрация..." : "Создать аккаунт"}
        </Button>
      </form>

      {/* Разделитель */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Или</span>
        </div>
      </div>

      {/* GitHub кнопка */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          // Здесь будет логика входа через GitHub
          console.log("GitHub sign up");
        }}
      >
        <Github className="mr-2 h-5 w-5" />
        Продолжить с GitHub
      </Button>

      {/* Ссылка на вход */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
