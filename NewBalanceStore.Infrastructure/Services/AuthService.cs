using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Application.Interfaces;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Enums;
using NewBalanceStore.Domain.Interfaces;

namespace NewBalanceStore.Infrastructure.Services;

/// <summary>
/// Сервіс автентифікації користувачів та генерації токенів безпеки.
/// Забезпечує безпечне хешування паролів за допомогою <see cref="PasswordHasher{TUser}"/>
/// та випуск JWT токенів з claims для контролю доступу (RBAC).
/// </summary>
public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;
    private readonly PasswordHasher<User> _passwordHasher = new();

    /// <summary>
    /// Ініціалізує новий екземпляр сервісу <see cref="AuthService"/>.
    /// </summary>
    /// <param name="userRepository">Репозиторій користувачів.</param>
    /// <param name="configuration">Конфігурація застосунку із налаштуваннями секції JWT.</param>
    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    /// <summary>
    /// Виконує реєстрацію нового покупця: перевіряє відсутність дубліката Email,
    /// створює хеш пароля та видає валідний JWT-токен.
    /// </summary>
    /// <param name="registerDto">Дані для реєстрації.</param>
    /// <returns>Відповідь із згенерованим токеном та даними створеного користувача.</returns>
    /// <exception cref="InvalidOperationException">Виникає, якщо обліковий запис із таким Email уже зареєстровано.</exception>
    public async Task<AuthResponseDto> RegisterAsync(UserRegisterDto registerDto)
    {
        var existingUser = await _userRepository.GetByEmailAsync(registerDto.Email);
        if (existingUser != null)
        {
            throw new InvalidOperationException("Пользователь с таким Email уже существует.");
        }

        var names = registerDto.FullName.Split(' ', 2);
        var firstName = names.Length > 0 ? names[0] : registerDto.FullName;
        var lastName = names.Length > 1 ? names[1] : string.Empty;

        var user = new User
        {
            Email = registerDto.Email,
            FirstName = firstName,
            LastName = lastName,
            Role = UserRole.Customer
        };

        // Безпечне гешування відкритого пароля через PasswordHasher (PBKDF2)
        user.PasswordHash = _passwordHasher.HashPassword(user, registerDto.Password);

        await _userRepository.CreateAsync(user);

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role.ToString()
        };
    }

    /// <summary>
    /// Виконує перевірку облікових даних користувача під час входу.
    /// Перевіряє збіг хешу пароля за допомогою криптографічного верифікатора.
    /// </summary>
    /// <param name="loginDto">Облікові дані (Email та відкритий пароль).</param>
    /// <returns>Відповідь із новим JWT-токеном сесії.</returns>
    /// <exception cref="UnauthorizedAccessException">Виникає при некоректному логіні або паролі.</exception>
    public async Task<AuthResponseDto> LoginAsync(UserLoginDto loginDto)
    {
        var user = await _userRepository.GetByEmailAsync(loginDto.Email);

        if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password) == PasswordVerificationResult.Failed)
        {
            throw new UnauthorizedAccessException("Неверный Email или пароль.");
        }

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role.ToString()
        };
    }

    /// <summary>
    /// Генерує підписаний симетричним ключем JWT-токен із клеймами користувача.
    /// Включає ідентифікатор суб'єкта (Sub), Email, роль (Role) та повне ім'я.
    /// </summary>
    /// <param name="user">Сутність користувача, для якого формується токен.</param>
    /// <returns>Рядкове представлення закодованого та підписаного JWT.</returns>
    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = Encoding.UTF8.GetBytes(jwtSettings["Secret"]!);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id ?? string.Empty),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim("fullName", user.FullName)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryInMinutes"] ?? "60")),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}