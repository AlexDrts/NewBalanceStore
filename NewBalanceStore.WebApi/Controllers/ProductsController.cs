using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Application.Interfaces;
using NewBalanceStore.Domain.Interfaces;

namespace NewBalanceStore.WebApi.Controllers;

/// <summary>
/// Контроллер для управления товарами в интернет-магазине
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IPhotoService _photoService;

    public ProductsController(IProductService productService, IPhotoService photoService)
    {
        _productService = productService;
        _photoService = photoService;
    }

    /// <summary>
    /// Получить список товаров с возможностью фильтрации
    /// </summary>
    /// <param name="filter">Параметры фильтрации товаров (категория, бренд, цена и т.д.)</param>
    /// <returns>Список отфильтрованных товаров</returns>
    /// <response code="200">Успешно возвращен список товаров</response>
    [HttpGet]
    public async Task<IActionResult> GetProducts([FromQuery] ProductFilterDto filter)
    {
        var products = await _productService.GetFilteredProductsAsync(filter);
        return Ok(products);
    }

    /// <summary>
    /// Получить конкретный товар по его уникальному идентификатору
    /// </summary>
    /// <param name="id">Идентификатор товара</param>
    /// <returns>Информация о товаре</returns>
    /// <response code="200">Товар успешно найден и возвращен</response>
    /// <response code="404">Товар с указанным ID не найден</response>
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetById(string id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product == null)
            return NotFound(new { message = $"Товар с ID '{id}' не найден." });

        return Ok(product);
    }

    /// <summary>
    /// Создать новый товар (доступно только администратору)
    /// </summary>
    /// <param name="dto">Данные для создания товара</param>
    /// <returns>Созданный объект товара</returns>
    /// <response code="201">Товар успешно создан</response>
    /// <response code="401">Пользователь не авторизован</response>
    /// <response code="403">Недостаточно прав (требуется роль Admin)</response>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto)
    {
        var createdProduct = await _productService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = createdProduct.Id }, createdProduct);
    }

    /// <summary>
    /// Загрузить изображение товара в облачное хранилище Cloudinary (доступно только администратору).
    /// </summary>
    /// <param name="file">Файл изображения</param>
    /// <returns>Ссылка на загруженное изображение</returns>
    /// <response code="200">Изображение успешно загружено</response>
    /// <response code="400">Файл не выбран или произошла ошибка при загрузке</response>
    [HttpPost("upload-image")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Файл не выбран");

        using var stream = file.OpenReadStream();
        var photoUrl = await _photoService.AddPhotoAsync(stream, file.FileName);

        if (string.IsNullOrEmpty(photoUrl))
            return BadRequest("Ошибка при загрузке изображении.");

        return Ok(new { Url = photoUrl });
    }

    /// <summary>
    /// Обновить существующий товар по ID (доступно только администратору).
    /// </summary>
    /// <param name="id">Идентификатор обновляемого товара</param>
    /// <param name="dto">Новые данные товара</param>
    /// <response code="204">Товар успешно обновлен</response>
    /// <response code="404">Товар с указанным ID не найден</response>
    /// <response code="401">Неавторизованный доступ</response>
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(string id, [FromBody] CreateProductDto dto)
    {
        var updated = await _productService.UpdateAsync(id, dto);
        if (!updated)
            return NotFound(new { message = $"Товар с ID '{id}' не найден." });

        return NoContent();
    }

    /// <summary>
    /// Удалить товар по ID (доступно только администратору)
    /// </summary>
    /// <param name="id">Идентификатор удаляемого товара</param>
    /// <response code="204">Товар успешно удален</response>
    /// <response code="404">Товар с указанным ID не найден</response>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _productService.DeleteAsync(id);
        if (!deleted)
            return NotFound(new { message = $"Товар с ID '{id}' не найден." });

        return NoContent();
    }
}