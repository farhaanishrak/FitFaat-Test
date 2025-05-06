"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  MessageSquare,
  Heart,
  Share2,
  MapPin,
  Plus,
  ImageIcon,
  Send,
  Trophy,
  Users,
  Calendar,
  Filter,
  ChevronRight,
  Star,
  MessageCircle,
  X,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

// Mock data for partners
const partners = [
  {
    id: 1,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    location: { lat: 23.8103, lng: 90.4125 }, // Dhaka coordinates
    distance: "2.5 miles away",
    interests: ["Running", "Weightlifting", "Yoga"],
    level: "Intermediate",
    bio: "Fitness enthusiast looking for running partners on weekends.",
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 2,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    location: { lat: 23.8223, lng: 90.4265 }, // Slightly offset from Dhaka
    distance: "3.8 miles away",
    interests: ["CrossFit", "HIIT", "Swimming"],
    level: "Advanced",
    bio: "CrossFit coach looking to connect with other fitness professionals.",
    rating: 4.9,
    reviews: 24,
  },
  {
    id: 3,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    location: { lat: 23.8003, lng: 90.4025 }, // Slightly offset from Dhaka
    distance: "1.2 miles away",
    interests: ["Cycling", "Hiking", "Bodyweight"],
    level: "Beginner",
    bio: "New to fitness and looking for a cycling buddy to explore the city.",
    rating: 4.5,
    reviews: 5,
  },
  {
    id: 4,
    name: "Olivia Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    location: { lat: 23.8153, lng: 90.4225 }, // Slightly offset from Dhaka
    distance: "4.5 miles away",
    interests: ["Pilates", "Yoga", "Dance"],
    level: "Intermediate",
    bio: "Yoga instructor looking to connect with other wellness professionals.",
    rating: 5.0,
    reviews: 18,
  },
]

// Mock data for posts
const posts = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "alexj",
    },
    content: "Just completed a 10K run in 45 minutes! New personal best. #Running #Fitness",
    image: "/placeholder.svg?height=300&width=500",
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
    image: "/placeholder.svg?height=300&width=500",
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

// Mock data for groups
const groups = [
  {
    id: 1,
    name: "Morning Runners Club",
    members: 128,
    description: "Group for early morning runners. We organize weekly group runs.",
    image: "/placeholder.svg?height=100&width=100",
    location: "Dhaka, Bangladesh",
    nextEvent: "Saturday, 6:00 AM - Gulshan Park",
  },
  {
    id: 2,
    name: "Vegan Fitness",
    members: 95,
    description: "Plant-based diet and fitness tips for optimal health.",
    image: "/placeholder.svg?height=100&width=100",
    location: "Online",
    nextEvent: "Wednesday, 7:00 PM - Zoom Nutrition Workshop",
  },
  {
    id: 3,
    name: "Weekend Warriors",
    members: 210,
    description: "For those who pack their workouts into the weekend.",
    image: "/placeholder.svg?height=100&width=100",
    location: "Dhaka, Bangladesh",
    nextEvent: "Sunday, 8:00 AM - Hatirjheel Lake Trail",
  },
]

// Mock data for rankings
const rankings = [
  {
    id: 1,
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    points: 1250,
    rank: 1,
    achievements: ["10K Steps Daily", "Workout Streak: 14 days", "Community Leader"],
    progress: 85,
  },
  {
    id: 2,
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    points: 1120,
    rank: 2,
    achievements: ["5K Runner", "Nutrition Master", "Early Bird"],
    progress: 78,
  },
  {
    id: 3,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    points: 980,
    rank: 3,
    achievements: ["Gym Rat", "Protein Pro", "Weekend Warrior"],
    progress: 65,
  },
  {
    id: 4,
    user: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    points: 870,
    rank: 4,
    achievements: ["Yoga Master", "Meditation Guru", "Healthy Eater"],
    progress: 58,
  },
  {
    id: 5,
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    points: 750,
    rank: 5,
    achievements: ["Weight Lifter", "Protein Champion", "Gym Regular"],
    progress: 50,
  },
]

export function Community() {
  const [activeTab, setActiveTab] = useState("feed")
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [newPost, setNewPost] = useState("")
  const [postImage, setPostImage] = useState(null)
  const [distance, setDistance] = useState([10])
  const [interests, setInterests] = useState("all")
  const mapRef = useRef(null)

  // Load Google Maps script
  useEffect(() => {
    if (!mapLoaded && activeTab === "partners") {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        setMapLoaded(true)
      }
      document.head.appendChild(script)
    }
  }, [mapLoaded, activeTab])

  // Initialize map when script is loaded
  useEffect(() => {
    if (mapLoaded && !map && mapRef.current) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 23.8103, lng: 90.4125 }, // Dhaka, Bangladesh
        zoom: 13,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      })
      setMap(newMap)

      // Add markers for partners
      const newMarkers = partners.map((partner) => {
        const marker = new window.google.maps.Marker({
          position: partner.location,
          map: newMap,
          title: partner.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#f59e0b",
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          },
        })

        // Add click event to marker
        marker.addListener("click", () => {
          setSelectedPartner(partner)
        })

        return marker
      })

      setMarkers(newMarkers)
    }
  }, [mapLoaded, map, partners])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: "me",
      content: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, newMessage])
    setChatMessage("")

    // Simulate response after 1 second
    setTimeout(() => {
      const response = {
        id: chatMessages.length + 2,
        sender: selectedPartner.name,
        content: "Thanks for reaching out! I'd love to connect for a workout session.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages((prev) => [...prev, response])
    }, 1000)
  }

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!newPost.trim()) return

    toast({
      title: "Post created",
      description: "Your post has been published to the community feed.",
    })

    setNewPost("")
    setPostImage(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPostImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleJoinGroup = (group) => {
    toast({
      title: "Group joined",
      description: `You have successfully joined ${group.name}.`,
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">Connect with fitness partners, join groups, and share your journey.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="partners">Find Partners</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
        </TabsList>

        {/* Feed Tab */}
        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                    <AvatarFallback>YA</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your fitness journey..."
                      className="mb-2 resize-none"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                    {postImage && (
                      <div className="relative mb-2">
                        <img
                          src={postImage || "/placeholder.svg"}
                          alt="Post preview"
                          className="rounded-md max-h-60 w-auto"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                          onClick={() => setPostImage(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <div>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <ImageIcon className="h-4 w-4" />
                            <span>Add Image</span>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      <Button type="submit" disabled={!newPost.trim()}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
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
                    {post.image && (
                      <div className="mt-2 mb-4">
                        <img src={post.image || "/placeholder.svg"} alt="Post" className="rounded-md w-full" />
                      </div>
                    )}
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

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Find Partners</CardTitle>
                  <CardDescription>Filter by distance and interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Distance (miles)</Label>
                      <span className="text-sm">{distance}mi</span>
                    </div>
                    <Slider value={distance} onValueChange={setDistance} max={50} step={1} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Select value={interests} onValueChange={setInterests}>
                      <SelectTrigger id="interests">
                        <SelectValue placeholder="Select interests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Interests</SelectItem>
                        <SelectItem value="running">Running</SelectItem>
                        <SelectItem value="weightlifting">Weightlifting</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="crossfit">CrossFit</SelectItem>
                        <SelectItem value="cycling">Cycling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-2">
                {partners.map((partner) => (
                  <Card
                    key={partner.id}
                    className={`cursor-pointer transition-all ${selectedPartner?.id === partner.id ? "border-primary" : ""}`}
                    onClick={() => setSelectedPartner(partner)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                          <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{partner.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {partner.distance}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <Card className="h-[400px] overflow-hidden">
                <div ref={mapRef} className="w-full h-full" />
              </Card>

              {selectedPartner && (
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{selectedPartner.name}</CardTitle>
                        <CardDescription>{selectedPartner.distance}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{selectedPartner.rating}</span>
                        <span className="text-xs text-muted-foreground">({selectedPartner.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedPartner.avatar || "/placeholder.svg"} alt={selectedPartner.name} />
                        <AvatarFallback>{selectedPartner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Level: {selectedPartner.level}</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedPartner.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm">{selectedPartner.bio}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => setChatOpen(true)}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Workout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Chat Dialog */}
          <Dialog open={chatOpen} onOpenChange={setChatOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Chat with {selectedPartner?.name}</DialogTitle>
                <DialogDescription>Send a message to connect and plan a workout</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col h-[300px]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 text-right mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button size="icon" onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Fitness Groups</h2>
              <p className="text-sm text-muted-foreground">Join local groups or create your own</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <img
                    src={group.image || "/placeholder.svg"}
                    alt={group.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                    <div className="flex items-center text-xs text-white/80">
                      <Users className="mr-1 h-3 w-3" />
                      <span>{group.members} members</span>
                      <span className="mx-2">•</span>
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>{group.location}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm mb-4">{group.description}</p>
                  <div className="bg-muted rounded-md p-2 mb-4">
                    <p className="text-xs font-medium">Next Event</p>
                    <p className="text-sm">{group.nextEvent}</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleJoinGroup(group)}>
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Group Detail Dialog */}
          <Dialog open={!!selectedGroup} onOpenChange={(open) => !open && setSelectedGroup(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedGroup?.name}</DialogTitle>
                <DialogDescription>
                  {selectedGroup?.members} members • {selectedGroup?.location}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <img
                      src={selectedGroup?.image || "/placeholder.svg"}
                      alt={selectedGroup?.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-sm">{selectedGroup?.description}</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Upcoming Events</h3>
                    <div className="bg-muted rounded-md p-3">
                      <p className="text-sm font-medium">{selectedGroup?.nextEvent}</p>
                      <Button size="sm" className="mt-2">
                        RSVP
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Recent Posts</h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {posts.map((post) => (
                      <div key={post.id} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{post.user.name}</span>
                          <span className="text-xs text-muted-foreground">{post.time}</span>
                        </div>
                        <p className="text-sm">{post.content}</p>
                        {post.image && (
                          <img src={post.image || "/placeholder.svg"} alt="Post" className="mt-2 rounded-md w-full" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedGroup(null)}>
                  Close
                </Button>
                <Button onClick={() => handleJoinGroup(selectedGroup)}>Join Group</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Community Rankings</h2>
              <p className="text-sm text-muted-foreground">See who's leading the fitness community this week</p>
            </div>
            <Select defaultValue="weekly">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly Rankings</SelectItem>
                <SelectItem value="monthly">Monthly Rankings</SelectItem>
                <SelectItem value="alltime">All-time Rankings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {rankings.slice(0, 3).map((user) => (
              <Card
                key={user.id}
                className={`border-${user.rank === 1 ? "yellow" : user.rank === 2 ? "gray" : "amber"}-500/50`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          user.rank === 1 ? "bg-yellow-500" : user.rank === 2 ? "bg-gray-400" : "bg-amber-700"
                        } text-white font-bold`}
                      >
                        {user.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.user.avatar || "/placeholder.svg"} alt={user.user.name} />
                        <AvatarFallback>{user.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy
                        className={`h-4 w-4 ${
                          user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-amber-700"
                        }`}
                      />
                      <span className="font-bold">{user.points}</span>
                      <span className="text-xs text-muted-foreground">pts</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{user.user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Progress</span>
                        <span>{user.progress}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            user.rank === 1 ? "bg-yellow-500" : user.rank === 2 ? "bg-gray-400" : "bg-amber-700"
                          }`}
                          style={{ width: `${user.progress}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Achievements</p>
                      <div className="flex flex-wrap gap-1">
                        {user.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top performers in the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rankings.map((user) => (
                  <div key={user.id} className={`flex items-center p-3 rounded-md ${user.rank <= 3 ? "bg-muted" : ""}`}>
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full ${
                        user.rank === 1
                          ? "bg-yellow-500"
                          : user.rank === 2
                            ? "bg-gray-400"
                            : user.rank === 3
                              ? "bg-amber-700"
                              : "bg-secondary"
                      } text-white text-xs font-bold mr-3`}
                    >
                      {user.rank}
                    </div>
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={user.user.avatar || "/placeholder.svg"} alt={user.user.name} />
                      <AvatarFallback>{user.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{user.user.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{user.achievements[0]}</span>
                        {user.achievements.length > 1 && <span> +{user.achievements.length - 1} more</span>}
                      </div>
                    </div>
                    <div className="font-bold">{user.points}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Leaderboard
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
