import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef } from "react";

// Схема валидации
const schema = yup.object({
  email: yup
    .string()
    .required("Email обязателен")
    .email("Некорректный формат email"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(6, "Пароль должен быть не менее 6 символов"),
  passwordConfirm: yup
    .string()
    .required("Подтверждение пароля обязательно")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

const HardForm = () => {
  const submitButtonRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Включаем валидацию при изменении полей
  });

  // Следим за изменениями всех полей для автофокуса
  const values = watch();

  // Устанавливаем фокус на кнопку при валидной форме
  useEffect(() => {
    if (isValid && submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, [isValid, values]);

  // Обработчик успешной отправки формы
  const onSubmit = (data) => {
    console.log("Форма отправлена:", data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
          </div>
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Пароль"
              {...register("password")}
              className={errors.password ? "error" : ""}
            />
          </div>
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Подтвердите пароль"
              {...register("passwordConfirm")}
              className={errors.passwordConfirm ? "error" : ""}
            />
          </div>
          {errors.passwordConfirm && (
            <span className="error-message">{errors.passwordConfirm.message}</span>
          )}
        </div>

        <button 
          type="submit" 
          ref={submitButtonRef}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default HardForm;