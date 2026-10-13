using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Enums;

namespace NewBalanceStore.Application.DTOs;

/// <summary>
/// DTO для передачі повної інформації про товар клієнтському застосунку (включаючи його унікальний ID).
/// </summary>
public class ProductDto : CreateProductDto
{
    /// <summary>
    /// Унікальний числовий ідентифікатор товару.
    /// </summary>
    public int Id { get; set; }
}