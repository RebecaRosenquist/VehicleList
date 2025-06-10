[Route("api/[controller]")]
[ApiController]
public class CarEquipmentController : ControllerBase
{
    private readonly CarContext _context;
    public CarEquipmentController(CarContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CarEquipment>>> GetCarEquipments()
    {
        return await _context.CarEquipments.ToListAsync();
    }
}
