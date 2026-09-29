using Moq;
using NUnit.Framework;
using AutoMapper;
using NewBalanceStore.Application.Services;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces;
using NewBalanceStore.Application.DTOs;

using Assert = NUnit.Framework.Assert;

namespace NewBalanceStore.UnitTests.Services
{
    [TestFixture]
    public class OrderServiceTests
    {
        private Mock<IOrderRepository> _orderRepoMock = null!;
        private Mock<IProductRepository> _productRepoMock = null!;
        private Mock<IMapper> _mapperMock = null!;
        private OrderService _orderService = null!;

        [SetUp]
        public void SetUp()
        {
            _orderRepoMock = new Mock<IOrderRepository>();
            _productRepoMock = new Mock<IProductRepository>();
            _mapperMock = new Mock<IMapper>();

            _orderService = new OrderService(
                _orderRepoMock.Object,
                _productRepoMock.Object,
                _mapperMock.Object
            );
        }

        [Test]
        public async Task GetOrderByIdAsync_ShouldReturnOrder_WhenExists()
        {
            var orderEntity = new Order { Id = 1, Status = "Pending" };
            var orderDto = new OrderDto { Id = 1, Status = "Pending" };

            _orderRepoMock.Setup(r => r.GetByIdAsync(1))
                          .ReturnsAsync(orderEntity);

            _mapperMock.Setup(m => m.Map<OrderDto>(It.IsAny<Order>()))
                       .Returns(orderDto);

            var result = await _orderService.GetOrderByIdAsync(1);

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Id, Is.EqualTo(1));
        }
        [Test]
        public async Task CreateOrderAsync_ShouldReturnCreatedOrderDto()
        {
            var createDto = new CreateOrderDto { CustomerName = "John Doe" };
            var orderEntity = new Order { Id = 10, CustomerName = "John Doe" };
            var resultDto = new OrderDto { Id = 10, CustomerName = "John Doe" };

            _orderRepoMock.Setup(r => r.CreateAsync(It.IsAny<Order>()))
              .Returns(Task.CompletedTask);

            _mapperMock.Setup(m => m.Map<Order>(It.IsAny<CreateOrderDto>()))
                       .Returns(orderEntity);

            _mapperMock.Setup(m => m.Map<OrderDto>(It.IsAny<Order>()))
                       .Returns(resultDto);

            var result = await _orderService.CreateOrderAsync(createDto);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(10));
        }

        [Test]
        public async Task GetAllOrdersAsync_ShouldReturnListOfOrders()
        {
            var orders = new List<Order> { new Order { Id = 1 }, new Order { Id = 2 } };
            var dtos = new List<OrderDto> { new OrderDto { Id = 1 }, new OrderDto { Id = 2 } };

            _orderRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(orders);
            _mapperMock.Setup(m => m.Map<IEnumerable<OrderDto>>(orders)).Returns(dtos);

            var result = await _orderService.GetAllOrdersAsync();

            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task UpdateOrderStatusAsync_ShouldCallRepository_WhenOrderExists()
        {
            var existingOrder = new Order { Id = 1, Status = "Pending" };

            _orderRepoMock.Setup(r => r.GetByIdAsync(1))
                          .ReturnsAsync(existingOrder);

            _orderRepoMock.Setup(r => r.UpdateStatusAsync(1, "Shipped"))
                          .Returns(Task.CompletedTask);

            await _orderService.UpdateOrderStatusAsync(1, "Shipped");

            _orderRepoMock.Verify(r => r.UpdateStatusAsync(1, "Shipped"), Times.Once);
        }
    }
}