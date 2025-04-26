namespace chat_application.Models;

public class User
{
    public string UserId { get; set; }
    public string UserName { get; set; }
    public List<string> ConnectionIdList { get; set; } = new List<string>();
    public string ProfileUrl { get; set; }
    public List<string> PinnedChatIdList { get; set; }
}