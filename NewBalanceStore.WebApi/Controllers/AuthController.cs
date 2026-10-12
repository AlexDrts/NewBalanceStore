using Microsoft.AspNetCore.Mvc;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Application.Interfaces;

namespace NewBalanceStore.WebApi.Controllers;

/// <summary>
/// Контролер автентифікації та реєстрації облікових записів користувачів.
/// Забезпечує отримання токенів авторизації для доступу до захищених операцій API.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    /// <summary>
    /// Ініціалізує новий екземпляр контролера <see cref="AuthController"/>.
    /// </summary>
    /// <param name="authService">Сервіс автентифікації користувачів.</param>
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Реєстрація нового користувача в системі.
    /// </summary>
    /// <param name="registerDto">Об'єкт із реєстраційними даними (Email, пароль, повне ім'я).</param>
    /// <returns>Відповідь із даними створеного профілю та JWT-токеном.</returns>
    /// <response code="200">Користувача успішно зареєстровано, повернуто токен доступу.</response>
    /// <response code="400">Помилка валідації або користувач із зазначеним Email уже існує.</response>
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto registerDto)
    {
        try
        {
            var result = await _authService.RegisterAsync(registerDto);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Вхід користувача в систему за допомогою Email та пароля.
    /// </summary>
    /// <param name="loginDto">Облікові дані користувача.</param>
    /// <returns>Відповідь із дійсним JWT-токеном сесії та роллю користувача.</returns>
    /// <response code="200">Автентифікація успішна, надано токен доступу.</response>
    /// <response code="401">Невірний логін або пароль.</response>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
    {
        try
        {
            var result = await _authService.LoginAsync(loginDto);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
}