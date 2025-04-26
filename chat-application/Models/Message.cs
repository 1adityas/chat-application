using chat_application.hubs;
namespace chat_application.Models;

public class Message
{
    public int Id { get; set; } = ChatHub.messages.Count + 1;
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public ReceiverType ReceiverType { get; set; }
    public string Content { get; set; }
    public Guid TenantId { get; set; }
    public MessageType MessageType { get; set; }
    public List<Reaction> Reactions { get; set; }
    public List<Guid> ReceivedBy { get; set; }
    public DateTime SentOn { get; set; }
    public List<Guid> SeenBy { get; set; }
    public List<Attachment> Attachments { get; set; }
    public string TimeStamp { get; set; }
}

public class Reaction
{
    public string ReactionType { get; set; }
    public List<Guid> UserIds { get; set; }
}

public class Attachment
{
    public string AttachmentType { get; set; }
    public string AttachmentUrl { get; set; }
}

public enum ReceiverType
{
    individual,
    group,
    channel
}

public enum MessageType
{
    normal,
    poll,
    notify
}