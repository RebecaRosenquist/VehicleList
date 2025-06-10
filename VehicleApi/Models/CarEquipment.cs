namespace VehicleApi.Models
{
    public class CarEquipment
    {
        public int Id { get; set; }               // Primärnyckel
        public string Name { get; set; }          // "Parkeringssensor"

        // En bil kan ha flera utrustningar, varje utrustning kan ha flera bilar NM(många till många)
        public ICollection<Car> Cars { get; set; }
    }
}