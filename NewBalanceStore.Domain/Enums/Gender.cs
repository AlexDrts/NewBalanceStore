using System;

namespace NewBalanceStore.Domain.Enums;

/// <summary>
/// Цільова гендерна категорія продукту в каталозі.
/// </summary>
public enum Gender
{
    /// <summary>
    /// Чоловічі моделі.
    /// </summary>
    Men,

    /// <summary>
    /// Жіночі моделі.
    /// </summary>
    Women,

    /// <summary>
    /// Універсальні моделі (унісекс).
    /// </summary>
    Unisex
}