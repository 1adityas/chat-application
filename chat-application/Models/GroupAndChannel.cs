namespace chat_application.Models;

public class GroupAndChannel
{
    public Guid Id { get; set; }
    public string name { get; set; }
    public List<Guid> Members { get; set; }
    public Guid TenantId { get; set; }
    public bool IsGroup { get; set; }
    public bool IsChannel { get; set; }
}
