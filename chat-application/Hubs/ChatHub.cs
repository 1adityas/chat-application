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
        public ChatHub()
        {
            if (users.Count == 0)
            {
                users.Add(new User() { UserName = "Admin", UserId = "Admin", ProfileUrl = "https://dragonball.guru/wp-content/uploads/2021/08/Bardock-Profile-Pic-300x300.png" });
                users.Add(new User() { UserName = "User1", UserId = "User1", ProfileUrl = "https://images.hindustantimes.com/img/2022/08/27/1600x900/Dragon-Ball-Super-Super-Hero_review_1661603386429_1661603386601_1661603386601.webp" });
                users.Add(new User() { UserName = "User2", UserId = "User2", ProfileUrl = "https://w0.peakpx.com/wallpaper/292/79/HD-wallpaper-dragon-ball-dragon-ball-super-super-hero.jpg" });
                users.Add(new User() { UserName = "User3", UserId = "User3", ProfileUrl = "https://w0.peakpx.com/wallpaper/292/79/HD-wallpaper-dragon-ball-dragon-ball-super-super-hero.jpg" });
                users.Add(new User() { UserName = "User4", UserId = "User4", ProfileUrl = "https://pbs.twimg.com/profile_images/1769741269327294464/bwPqFyxG_400x400.jpg" });
            }
        }
        public async Task SendMessage(string recipient, string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var userId = httpContext?.Request.Query["id"].ToString();

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
