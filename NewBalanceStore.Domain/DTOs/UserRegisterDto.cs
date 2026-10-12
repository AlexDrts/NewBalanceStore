using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Application.DTOs;

/// <summary>
/// DTO для передачі реєстраційних даних при створенні нового облікового запису користувача.
/// </summary>
public class UserRegisterDto
{
    /// <summary>
    /// Адреса електронної пошти нового користувача (має бути унікальною в системі).
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Пароль користувача (на бекенді буде перетворений на криптографічний хеш).
    /// </summary>
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// Повне ім'я та прізвище користувача (наприклад, "Олександр Шевченко").
    /// </summary>
    public string FullName { get; set; } = string.Empty;
}