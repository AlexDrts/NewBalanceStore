using Microsoft.AspNetCore.Mvc;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Application.Services;

namespace NewBalanceStore.WebApi.Controllers
{
    /// <summary>
    /// Контролер для оформлення та управління клієнтськими замовленнями.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        /// <summary>
        /// Ініціалізує новий екземпляр контролера <see cref="OrdersController"/>.
        /// </summary>
        /// <param name="orderService">Сервіс обробки замовлень.</param>
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        /// <summary>
        /// Створити нове замовлення.
        /// Сервер автоматично звіряє ціни за каталогом та розраховує фінальну суму.
        /// </summary>
        /// <param name="dto">Дані замовлення (покупець, адреса доставки та перелік товарів).</param>
        /// <returns>Створене замовлення з присвоєним ідентифікатором.</returns>
        /// <response code="201">Замовлення успішно створено.</response>
        /// <response code="400">Некоректні вхідні дані замовлення.</response>
        [HttpPost]
        [ProducesResponseType(typeof(OrderDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateOrderDto dto)
        {
            var result = await _orderService.CreateOrderAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        /// <summary>
        /// Отримати детальну інформацію про замовлення за його ідентифікатором.
        /// </summary>
        /// <param name="id">Числовий ідентифікатор замовлення.</param>
        /// <returns>Інформація про замовлення.</returns>
        /// <response code="200">Замовлення успішно знайдено.</response>
        /// <response code="404">Замовлення з вказаним ідентифікатором не знайдено.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            return Ok(order);
        }

        /// <summary>
        /// Оновити статус виконання замовлення (доступно операторам та системі).
        /// </summary>
        /// <param name="id">Ідентифікатор замовлення.</param>
        /// <param name="status">Новий рядок статусу (наприклад, "Processing", "Shipped", "Delivered").</param>
        /// <response code="204">Статус замовлення успішно оновлено.</response>
        /// <response code="404">Замовлення з вказаним ID не знайдено.</response>
        [HttpPatch("{id}/status")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            await _orderService.UpdateOrderStatusAsync(id, status);
            return NoContent();
        }
    }
}