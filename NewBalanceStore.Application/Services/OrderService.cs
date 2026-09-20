using AutoMapper;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces;

namespace NewBalanceStore.Application.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(CreateOrderDto dto);
        Task<OrderDto?> GetOrderByIdAsync(int id);
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
        Task UpdateOrderStatusAsync(int id, string status);
    }

    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto)
        {
            var order = new Order
            {
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                CustomerPhone = dto.CustomerPhone,
                ShippingAddress = dto.ShippingAddress,
                CreatedAt = DateTime.UtcNow,
                Status = "Pending"
            };

            decimal totalAmount = 0;

            foreach (var itemDto in dto.Items)
            {
                var product = await _productRepository.GetByIdAsync(itemDto.ProductId.ToString());
                if (product == null) continue;

                var orderItem = new OrderItem
                {
                    ProductId = product.Id.ToString(),
                    ProductName = product.Name,
                    Color = itemDto.Color,
                    Size = itemDto.Size,
                    Quantity = itemDto.Quantity,
                    Price = product.Price
                };

                totalAmount += product.Price * itemDto.Quantity;
                order.Items.Add(orderItem);
            }

            order.TotalAmount = totalAmount;
            await _orderRepository.CreateAsync(order);

            return _mapper.Map<OrderDto>(order);
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            return order == null ? null : _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _orderRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task UpdateOrderStatusAsync(int id, string status)
        {
            await _orderRepository.UpdateStatusAsync(id, status);
        }
    }
}