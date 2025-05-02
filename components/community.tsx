"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Heart, Share2, MapPin, Search, Plus } from "lucide-react"

const posts = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexj",
    },
    content: "Just completed a 10K run in 45 minutes! New personal best. #Running #Fitness",
    likes: 24,
    comments: 5,
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "sarahw",
    },
    content: "Today's meal prep done! Healthy eating is 80% of the fitness journey. #MealPrep #HealthyEating",
    likes: 42,
    comments: 8,
    time: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "mikec",
    },
    content: "Found a great new gym in downtown! Anyone want to join for a workout session this weekend?",
    likes: 18,
    comments: 12,
    time: "Yesterday",
  },
]

const partners = [
  {
    id: 1,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "2.5 miles away",
    interests: ["Running", "Weightlifting", "Yoga"],
    level: "Intermediate",
  },
  {
    id: 2,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "3.8 miles away",
    interests: ["CrossFit", "HIIT", "Swimming"],
    level: "Advanced",
  },
  {
    id: 3,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "1.2 miles away",
    interests: ["Cycling", "Hiking", "Bodyweight"],
    level: "Beginner",
  },
  {
    id: 4,
    name: "Olivia Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "4.5 miles away",
    interests: ["Pilates", "Yoga", "Dance"],
    level: "Intermediate",
  },
]

const groups = [
  {
    id: 1,
    name: "Morning Runners Club",
    members: 128,
    description: "Group for early morning runners. We organize weekly group runs.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Vegan Fitness",
    members: 95,
    description: "Plant-based diet and fitness tips for optimal health.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Weekend Warriors",
    members: 210,
    description: "For those who pack their workouts into the weekend.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function Community() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">Connect with fitness partners, join groups, and share your journey.</p>
      </div>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="partners">Find Partners</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input placeholder="Share your fitness journey..." className="mb-2" />
                  <div className="flex justify-end">
                    <Button>Post</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{post.user.name}</p>
                        <p className="text-sm text-muted-foreground">@{post.user.username}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                    <p className="my-2">{post.content}</p>
                    <div className="flex gap-4 mt-4">
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="partners" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by location or interests" className="pl-8" />
                </div>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {partners.map((partner) => (
              <Card key={partner.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                      <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{partner.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="mr-1 h-3 w-3" />
                          {partner.location}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Level: {partner.level}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {partner.interests.map((interest, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3">
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="groups" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription>{group.members} members</CardDescription>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={group.image || "/placeholder.svg"} alt={group.name} />
                      <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
