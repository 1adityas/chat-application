using chat_application.Models;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics.Metrics;

namespace chat_application.hubs
{
    public class ChatHub : Hub
    {
        public static int counter = 0;
        public static List<User> users = new List<User>();
        public static List<Message> messages = new List<Message>();
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var userId = httpContext?.Request.Query["userid"].ToString();

            if (string.IsNullOrEmpty(userId))
            {
                throw new Exception("User Id is missing");
            }

            await Clients.Caller.SendAsync("UserId", userId);
            //await Clients.Caller.SendAsync("Messages", messages);
            //var user = Context.User;
            var connectedUser = users.Where(s => s.UserId.ToLower().Equals(userId.ToLower())).FirstOrDefault();
            if (connectedUser is not null)
            {
                connectedUser.ConnectionIdList.Add(Context.ConnectionId);
                await Clients.Caller.SendAsync("login", Context.ConnectionId);  
            }
            else
            {
                users.Add(new User() { UserName = userId, UserId = userId, ProfileUrl = "https://pbs.twimg.com/profile_images/1769741269327294464/bwPqFyxG_400x400.jpg", ConnectionIdList = { Context.ConnectionId } });
            }

            // Track online users
            await base.OnConnectedAsync();
            Console.WriteLine("new connection, total: " + ++counter);
        }

    }
}
