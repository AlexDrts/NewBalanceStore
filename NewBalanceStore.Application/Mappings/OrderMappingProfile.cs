using AutoMapper;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Domain.Entities;

namespace NewBalanceStore.Application.Mappings;

public sealed class OrderMappingProfile : Profile
{
    public OrderMappingProfile()
    {
        CreateMap<Order, OrderDto>();
        CreateMap<OrderItem, OrderItemDto>()
            .ForMember(destination => destination.ProductId,
                options => options.MapFrom(source => int.Parse(source.ProductId)));
    }
}
