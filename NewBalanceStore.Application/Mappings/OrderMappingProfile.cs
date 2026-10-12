using AutoMapper;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Domain.Entities;

namespace NewBalanceStore.Application.Mappings;

/// <summary>
/// Профіль AutoMapper для мапінгу доменних сутностей замовлення (<see cref="Order"/>, <see cref="OrderItem"/>)
/// у відповідні об'єкти передачі даних (<see cref="OrderDto"/>, <see cref="OrderItemDto"/>).
/// </summary>
public sealed class OrderMappingProfile : Profile
{
    /// <summary>
    /// Ініціалізує правила відповідності між властивостями доменних моделей та DTO.
    /// Зокрема виконує парсинг рядкового ProductId в числовий тип.
    /// </summary>
    public OrderMappingProfile()
    {
        CreateMap<Order, OrderDto>();
        CreateMap<OrderItem, OrderItemDto>()
            .ForMember(destination => destination.ProductId,
                options => options.MapFrom(source => int.Parse(source.ProductId)));
    }
}

