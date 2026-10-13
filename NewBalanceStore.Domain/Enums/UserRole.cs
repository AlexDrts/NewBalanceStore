using System;

namespace NewBalanceStore.Domain.Enums;

/// <summary>
/// Ролі користувачів для системи управління доступом (Role-Based Access Control - RBAC).
/// </summary>
public enum UserRole
{
    /// <summary>
    /// Зареєстрований покупець із базовими правами (кошик, оформлення замовлень, власний кабінет).
    /// </summary>
    Customer,

    /// <summary>
    /// Адміністратор платформи із повними привілеями (управління товарами, замовленнями, аналітикою).
    /// </summary>
    Admin
}