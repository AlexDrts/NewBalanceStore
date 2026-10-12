using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Domain.Entities;

/// <summary>
/// Значеннєвий об'єкт (Value Object), що інкапсулює персональні контактні дані замовника.
/// </summary>
public class CustomerInfo
{
    /// <summary>
    /// Ім'я замовника.
    /// </summary>
    public string FirstName { get; set; } = string.Empty;

    /// <summary>
    /// Прізвище замовника.
    /// </summary>
    public string LastName { get; set; } = string.Empty;

    /// <summary>
    /// Адреса електронної пошти замовника для надсилання квитанцій та трекінг-номерів.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Номер телефону для зв'язку з кур'єром або оператором.
    /// </summary>
    public string Phone { get; set; } = string.Empty;
}