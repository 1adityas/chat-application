namespace chat_application.Models.ResponseObjects
{
    public class ChatboxMessages
    {
        public string ChatId { get; set; }
        public string ChatName { get; set; }
        public ActiveStatus ActiveStatus { get; set; }
        public string ProfileURL { get; set; }
        public List<Message> ChatMessages { get; set; }
    }
}
