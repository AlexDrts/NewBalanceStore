using System;
using System.Collections.Generic;
using System.Text;
using NewBalanceStore.Application.DTOs;

namespace NewBalanceStore.Application.Interfaces;

/// <summary>
/// Контракт сервісу автентифікації та реєстрації користувачів.
/// Забезпечує перевірку облікових даних, хешування паролів та видачу JWT-токенів.
/// </summary>
public interface IAuthService
{
    /// <summary>
    /// Реєструє нового користувача в системі, перевіряючи унікальність Email.
    /// </summary>
    /// <param name="registerDto">Дані для реєстрації користувача (Email, Password, FullName).</param>
    /// <returns>DTO з JWT-токеном та базовими відомостями про створений профіль.</returns>
    /// <exception cref="InvalidOperationException">Виникає, якщо користувач з таким Email вже існує в системі.</exception>
    Task<AuthResponseDto> RegisterAsync(UserRegisterDto registerDto);

    /// <summary>
    /// Виконує вхід користувача у систему за допомогою перевірки пари логін/пароль.
    /// </summary>
    /// <param name="loginDto">Дані для входу (Email та відкритий пароль).</param>
    /// <returns>DTO з згенерованим JWT-токеном та інформацією про роль користувача.</returns>
    /// <exception cref="UnauthorizedAccessException">Виникає у разі невірного пароля або відсутності акаунта з даним Email.</exception>
    Task<AuthResponseDto> LoginAsync(UserLoginDto loginDto);
}