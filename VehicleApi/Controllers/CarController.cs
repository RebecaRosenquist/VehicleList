using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VehicleApi.Models;
using VehicleApi.Data;
using VehicleApi.Dtos;

namespace VehicleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarContext _context;

        public CarController(CarContext context)
        {
            _context = context;
        }

   
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetCars()
        {
            var cars = await _context.Cars
                .Include(c => c.Brand)
                .Include(c => c.CarEquipments)
                .ToListAsync();

            var carDtos = cars.Select(MapCarToDto).ToList();
            return Ok(carDtos);
        }

    
        [HttpGet("{id}")]
        public async Task<ActionResult<CarDto>> GetCar(int id)
        {
            var car = await _context.Cars
                .Include(c => c.Brand)
                .Include(c => c.CarEquipments)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (car == null)
                return NotFound();

            return MapCarToDto(car);
        }

        [HttpPost]
        public async Task<ActionResult<CarDto>> PostCar(CarCreateUpdateDto carDto)
        {
            var car = new Car
            {
                VIN = carDto.VIN,
                LicensePlateNumber = carDto.LicensePlateNumber,
                ModelName = carDto.ModelName,
                Colour = carDto.Colour,
                BrandId = carDto.BrandId,
                CreatedAt = DateTime.UtcNow,
            };

            if (carDto.CarEquipmentIds?.Any() == true)
            {
                var equipments = await _context.CarEquipments
                    .Where(ce => carDto.CarEquipmentIds.Contains(ce.Id))
                    .ToListAsync();

                car.CarEquipments = equipments;
            }

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            var createdCar = await _context.Cars
                .Include(c => c.Brand)
                .Include(c => c.CarEquipments)
                .FirstOrDefaultAsync(c => c.Id == car.Id);

            return CreatedAtAction(nameof(GetCar), new { id = car.Id }, MapCarToDto(createdCar));
        }


 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, CarCreateUpdateDto carDto)
        {
            var car = await _context.Cars
                .Include(c => c.CarEquipments)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (car == null)
                return NotFound();

            car.VIN = carDto.VIN;
            car.LicensePlateNumber = carDto.LicensePlateNumber;
            car.ModelName = carDto.ModelName;
            car.Colour = carDto.Colour;
            car.BrandId = carDto.BrandId;

            var equipments = await _context.CarEquipments
                .Where(ce => carDto.CarEquipmentIds.Contains(ce.Id))
                .ToListAsync();

            car.CarEquipments.Clear();
            foreach (var eq in equipments)
            {
                car.CarEquipments.Add(eq);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cars.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

    
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
                return NotFound();

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }

 
        private CarDto MapCarToDto(Car car)
        {
            return new CarDto
            {
                Id = car.Id,
                VIN = car.VIN,
                LicensePlateNumber = car.LicensePlateNumber,
                ModelName = car.ModelName,
                Colour = car.Colour,
                BrandId = car.BrandId,
                Brand = new BrandDto
                {
                    Id = car.Brand?.Id ?? 0,
                    Name = car.Brand?.Name
                },
                CarEquipments = car.CarEquipments?.Select(eq => new CarEquipmentDto
                {
                    Id = eq.Id,
                    Name = eq.Name
                }).ToList() ?? new List<CarEquipmentDto>()
            };
        }
    }
}
