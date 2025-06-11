using Microsoft.EntityFrameworkCore;
using VehicleApi.Models;

namespace VehicleApi.Data
{
    public class CarContext : DbContext
    {
        public CarContext(DbContextOptions<CarContext> options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<CarEquipment> CarEquipments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

         
            modelBuilder.Entity<Car>()
                .HasOne(c => c.Brand)
                .WithMany(b => b.Cars)
                .HasForeignKey(c => c.BrandId);

            modelBuilder.Entity<Car>()
                .HasMany(c => c.CarEquipments)
                .WithMany(ce => ce.Cars)
                .UsingEntity<Dictionary<string, object>>(
                    "CarCarEquipment",
                    j => j.HasOne<CarEquipment>().WithMany().HasForeignKey("CarEquipmentsId"),
                    j => j.HasOne<Car>().WithMany().HasForeignKey("CarsId"),
                    j =>
                    {
                        j.HasData(
                            new { CarsId = 1, CarEquipmentsId = 1 },
                            new { CarsId = 1, CarEquipmentsId = 2 },
                            new { CarsId = 2, CarEquipmentsId = 1 }
                        );
                    });

     
            modelBuilder.Entity<Brand>().HasData(
                new Brand { Id = 1, Name = "Volvo" },
                new Brand { Id = 2, Name = "Toyota" },
                new Brand { Id = 3, Name = "BMW" },
                new Brand { Id = 4, Name = "Mercedes-Benz" },
                new Brand { Id = 5, Name = "Audi" },
                new Brand { Id = 6, Name = "Ford" },
                new Brand { Id = 7, Name = "Honda" },
                new Brand { Id = 8, Name = "Volkswagen" },
                new Brand { Id = 9, Name = "Tesla" },
                new Brand { Id = 10, Name = "Hyundai" }
            );

         
            modelBuilder.Entity<CarEquipment>().HasData(
                new CarEquipment { Id = 1, Name = "Air Conditioning" },
                new CarEquipment { Id = 2, Name = "Leather Seats" },
                new CarEquipment { Id = 3, Name = "Sunroof" },
                new CarEquipment { Id = 4, Name = "Bluetooth" },
                new CarEquipment { Id = 5, Name = "Backup Camera" },
                new CarEquipment { Id = 6, Name = "Cruise Control" },
                new CarEquipment { Id = 7, Name = "Heated Seats" },
                new CarEquipment { Id = 8, Name = "Navigation System" },
                new CarEquipment { Id = 9, Name = "Keyless Entry" },
                new CarEquipment { Id = 10, Name = "Parking Sensors" }
            );

      
            modelBuilder.Entity<Car>().HasData(
                new Car
                {
                    Id = 1,
                    VIN = "123456789",
                    LicensePlateNumber = "ABC123",
                    ModelName = "XC90",
                    Colour = "Black",
                    BrandId = 1,
                    CreatedAt = DateTime.Now
                },
                new Car
                {
                    Id = 2,
                    VIN = "987654321",
                    LicensePlateNumber = "XYZ789",
                    ModelName = "Corolla",
                    Colour = "White",
                    BrandId = 2,
                    CreatedAt = DateTime.Now,
                }
            );
        }
    }
}
