namespace chat_application.Models.ResponseObjects
{
    public class ChatList
    {
        public string MessageId { get; set; }
        public string ChatId { get; set; }
        public string ChatName { get; set; }
        public string LastMessage { get; set; }
        public string TimeStamp { get; set; }
        public ActiveStatus ActiveStatus { get; set; }
        public Boolean IsPinned { get; set; }
        public string ProfileURL { get; set; }
        public Boolean IsLastMsgSeen { get; set; }

        //extra details for mapping

        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public DateTime SentOn { get; set; }
    }

    public enum ActiveStatus{
        Offline,
        Available,
        Busy,
        DoNotDisturb,
        Away
    }
}
