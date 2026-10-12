using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Application.DTOs;

/// <summary>
/// DTO відповіді сервера при успішній автентифікації або реєстрації користувача.
/// Містить підписаний JWT-токен та базові відомості про профіль.
/// </summary>
public class AuthResponseDto
{
    /// <summary>
    /// Підписаний JSON Web Token (JWT) для авторизації наступних API-запитів через заголовок Bearer.
    /// </summary>
    public string Token { get; set; } = string.Empty;

    /// <summary>
    /// Адреса електронної пошти автентифікованого користувача.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Повне ім'я користувача для відображення у призначеному для користувача інтерфейсі.
    /// </summary>
    public string FullName { get; set; } = string.Empty;

    /// <summary>
    /// Роль користувача у системі ("Customer" або "Admin").
    /// </summary>
    public string Role { get; set; } = "User";
}