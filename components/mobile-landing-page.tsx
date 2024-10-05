'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Globe, User, Calendar, Users, Home, MapPin, Plus, HandHeart, Linkedin, Search, ChevronLeft, ChevronRight, Phone, Mail, Edit, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Confetti from 'react-confetti'

export function MobileLandingPageComponent() {
 const [isMenuOpen, setIsMenuOpen] = useState(false)
 const [activeTab, setActiveTab] = useState('home')
 const [isLoggedIn, setIsLoggedIn] = useState(false)
 const [language, setLanguage] = useState('es')
 const [showConfetti, setShowConfetti] = useState(false)
 const [currentMemberPage, setCurrentMemberPage] = useState(1)
 const [currentEventPage, setCurrentEventPage] = useState(1)
 const [currentPastEventPage, setCurrentPastEventPage] = useState(1)
 const [showPastEvents, setShowPastEvents] = useState(false)
 const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' })
 const [loginForm, setLoginForm] = useState({ email: '', password: '' })
 const [showAddPhotoDialog, setShowAddPhotoDialog] = useState(false)
 const [showEditProfileDialog, setShowEditProfileDialog] = useState(false)
 const [editProfileForm, setEditProfileForm] = useState({ name: '', company: '', role: '', linkedin: '', cellphone: '' })
 const [searchQuery, setSearchQuery] = useState('')
 const { toast } = useToast()

 const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
 const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es')

 const handleRegister = (e: React.FormEvent) => {
   e.preventDefault()
   if (validateRegisterForm()) {
     setShowConfetti(true)
     setIsLoggedIn(true)
     setActiveTab('profile')
     toast({
       title: language === 'es' ? "¡Bienvenido a la CX Community de Líderes CX!" : "Welcome to CX Leaders CX Community!",
       description: language === 'es' ? "Tu cuenta ha sido creada exitosamente." : "Your account has been created successfully.",
     })
     setTimeout(() => setShowConfetti(false), 5000)
   }
 }

 const validateRegisterForm = () => {
   if (!registerForm.name || !registerForm.email || !registerForm.password) {
     toast({
       title: language === 'es' ? "Error de registro" : "Registration Error",
       description: language === 'es' ? "Por favor, completa todos los campos." : "Please fill in all fields.",
       variant: "destructive",
     })
     return false
   }
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
     toast({
       title: language === 'es' ? "Error de correo electrónico" : "Email Error",
       description: language === 'es' ? "Por favor, ingresa un correo electrónico válido." : "Please enter a valid email address.",
       variant: "destructive",
     })
     return false
   }
   if (registerForm.password.length < 8) {
     toast({
       title: language === 'es' ? "Error de contraseña" : "Password Error",
       description: language === 'es' ? "La contraseña debe tener al menos 8 caracteres." : "Password must be at least 8 characters long.",
       variant: "destructive",
     })
     return false
   }
   return true
 }

 const handleLogin = (e: React.FormEvent) => {
   e.preventDefault()
   if (validateLoginForm()) {
     setIsLoggedIn(true)
     setActiveTab('profile')
     toast({
       title: language === 'es' ? "¡Bienvenido de vuelta!" : "Welcome back!",
       description: language === 'es' ? "Has iniciado sesión exitosamente." : "You've successfully logged in.",
     })
   }
 }

 const validateLoginForm = () => {
   if (!loginForm.email || !loginForm.password) {
     toast({
       title: language === 'es' ? "Error de inicio de sesión" : "Login Error",
       description: language === 'es' ? "Por favor, completa todos los campos." : "Please fill in all fields.",
       variant: "destructive",
     })
     return false
   }
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
     toast({
       title: language === 'es' ? "Error de correo electrónico" : "Email Error",
       description: language === 'es' ? "Por favor, ingresa un correo electrónico válido." : "Please enter a valid email address.",
       variant: "destructive",
     })
     return false
   }
   return true
 }

 const handleVolunteer = (eventId: number) => {
   if (!isLoggedIn) {
     toast({
       title: language === 'es' ? "Por favor, regístrate o inicia sesión para ser voluntario" : "Please register or login to volunteer",
       description: language === 'es' ? "Necesitas ser miembro para ser voluntario en eventos." : "You need to be a member to volunteer for events.",
     })
     setActiveTab('home')
   } else {
     toast({
       title: language === 'es' ? "¡Gracias por ofrecerte como voluntario!" : "Thank you for volunteering!",
       description: language === 'es' ? "Nos pondremos en contacto contigo pronto con más información." : "We'll contact you with more information soon.",
     })
   }
 }

 const handleAddToCalendar = (event: any) => {
   const options = [
     { name: 'Google Calendar', url: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${encodeURIComponent(event.date)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}` },
     { name: 'Outlook', url: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.name)}&body=${encodeURIComponent(event.description)}&startdt=${encodeURIComponent(event.date)}&enddt=${encodeURIComponent(event.date)}&location=${encodeURIComponent(event.location)}` },
     { name: 'Email', url: `mailto:?subject=${encodeURIComponent(event.name)}&body=${encodeURIComponent(`Event: ${event.name}
Date: ${event.date}
Location: ${event.location}
Description: ${event.description}`)}` }
   ]

   const optionsHtml = options.map(option => 
     `<a href="${option.url}" target="_blank" rel="noopener noreferrer" style="display: block; margin: 10px 0; padding: 10px; background-color: #FFB81C; color: #0A2240; text-decoration: none; text-align: center; border-radius: 5px;">${option.name}</a>`
   ).join('')

   const alertHtml = `
     <div style="font-family: Arial, sans-serif; position: relative;">
       <h2 style="color: #0A2240;">${language === 'es' ? 'Añadir al calendario' : 'Add to calendar'}</h2>
       <p>${language === 'es' ? 'Elige una opción:' : 'Choose an option:'}</p>
       ${optionsHtml}
       <button id="closeButton" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; cursor: pointer;">✕</button>
     </div>
   `

   const alertContainer = document.createElement('div')
   alertContainer.innerHTML = alertHtml
   alertContainer.style.position = 'fixed'
   alertContainer.style.top = '50%'
   alertContainer.style.left = '50%'
   alertContainer.style.transform = 'translate(-50%, -50%)'
   alertContainer.style.backgroundColor = 'white'
   alertContainer.style.padding = '20px'
   alertContainer.style.borderRadius = '10px'
   alertContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
   alertContainer.style.zIndex = '1001'  // Increased z-index to ensure it's above other elements

   document.body.appendChild(alertContainer)

   const closeAlert = () => {
     document.body.removeChild(alertContainer)
   }

   const closeButton = alertContainer.querySelector('#closeButton') as HTMLButtonElement
   closeButton.onclick = closeAlert

   const bottomCloseButton = document.createElement('button')
   bottomCloseButton.textContent = language === 'es' ? 'Cerrar' : 'Close'
   bottomCloseButton.style.marginTop = '10px'
   bottomCloseButton.style.padding = '5px 10px'
   bottomCloseButton.style.backgroundColor = '#0A2240'
   bottomCloseButton.style.color = 'white'
   bottomCloseButton.style.border = 'none'
   bottomCloseButton.style.borderRadius = '5px'
   bottomCloseButton.style.cursor = 'pointer'
   bottomCloseButton.onclick = closeAlert

   alertContainer.appendChild(bottomCloseButton)
 }

 const members = [
   { id: 1, name: 'John Doe', title: 'CX Manager', company: 'Tech Co', bio: 'Passionate about improving customer experiences.', image: 'https://i.pravatar.cc/300?img=1', linkedin: 'https://www.linkedin.com/in/johndoe' },
   { id: 2, name: 'Jane Smith', title: 'CX Director', company: 'Retail Inc', bio: 'Dedicated to creating memorable customer journeys.', image: 'https://i.pravatar.cc/300?img=2', linkedin: 'https://www.linkedin.com/in/janesmith' },
   { id: 3, name: 'Mike Johnson', title: 'CX Analyst', company: 'Service Pro', bio: 'Data-driven approach to enhancing customer satisfaction.', image: 'https://i.pravatar.cc/300?img=3', linkedin: 'https://www.linkedin.com/in/mikejohnson' },
   { id: 4, name: 'Sarah Lee', title: 'CX Specialist', company: 'E-commerce Plus', bio: 'Focused on optimizing digital customer experiences.', image: 'https://i.pravatar.cc/300?img=4', linkedin: 'https://www.linkedin.com/in/sarahlee' },
   { id: 5, name: 'David Chen', title: 'CX Consultant', company: 'CX Solutions', bio: 'Helping businesses transform their customer experience strategies.', image: 'https://i.pravatar.cc/300?img=5', linkedin: 'https://www.linkedin.com/in/davidchen' },
   { id: 6, name: 'Emily Brown', title: 'Voice of Customer Manager', company: 'Feedback First', bio: 'Passionate about turning customer feedback into actionable insights.', image: 'https://i.pravatar.cc/300?img=6', linkedin: 'https://www.linkedin.com/in/emilybrown' },
   { id: 7, name: 'Alex Turner', title: 'Customer Success Manager', company: 'SaaS Innovate', bio: 'Dedicated to ensuring customers achieve their desired outcomes.', image: 'https://i.pravatar.cc/300?img=7', linkedin: 'https://www.linkedin.com/in/alexturner' },
   { id: 8, name: 'Olivia Garcia', title: 'CX Operations Lead', company: 'Optimize CX', bio: 'Streamlining CX processes for maximum efficiency and impact.', image: 'https://i.pravatar.cc/300?img=8', linkedin: 'https://www.linkedin.com/in/oliviagarcia' },
   { id: 9, name: 'Ryan Murphy', title: 'Digital CX Innovator', company: 'Future CX', bio: 'Leveraging emerging technologies to create cutting-edge CX solutions.', image: 'https://i.pravatar.cc/300?img=9', linkedin: 'https://www.linkedin.com/in/ryanmurphy' },
 ]

 const events = [
   { id: 1, name: 'CX Summit 2024', date: 'June 15, 2024', location: 'Virtual', description: 'Annual gathering of CX professionals to discuss latest trends and strategies.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/1234567890' },
   { id: 2, name: 'Customer Journey Mapping Workshop', date: 'July 20, 2024', location: 'Mexico City', description: 'Hands-on workshop to master the art of customer journey mapping.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/abcdefghijk' },
   { id: 3, name: 'AI in Customer Experience Webinar', date: 'August 5, 2024', location: 'Online', description: 'Learn how AI is revolutionizing the field of customer experience.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/lmnopqrstuv' },
   { id: 4, name: 'CX Metrics Masterclass', date: 'September 10, 2024', location: 'Guadalajara', description: 'Deep dive into key CX metrics and how to leverage them for business success.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/wxyz1234' },
   { id: 5, name: 'Emotional Intelligence in CX', date: 'October 3, 2024', location: 'Virtual', description: 'Exploring the role of emotional intelligence in delivering exceptional customer experiences.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/abcd5678' },
   { id: 6, name: 'CX Technology Expo', date: 'November 15, 2024', location: 'Mexico City', description: 'Showcase of the latest technologies shaping the future of customer experience.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/efgh9012' },
   { id: 7, name: 'Voice of Customer Summit', date: 'December 5, 2024', location: 'Monterrey', description: 'Strategies for collecting, analyzing, and acting on customer feedback.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/ijkl3456' },
   { id: 8, name: 'CX Leadership Forum', date: 'January 20, 2025', location: 'Virtual', description: 'Gathering of CX leaders to share insights and best practices.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/mnop7890' },
   { id: 9, name: 'Omnichannel CX Strategies', date: 'February 12, 2025', location: 'Cancún', description: 'Learn how to create seamless experiences across all customer touchpoints.', image: '/placeholder.svg?height=300&width=400', mapLink: 'https://goo.gl/maps/qrst1234' },
 ]

 const pastEvents = [
   { id: 1, name: 'CX Trends 2023', date: 'November 10, 2023', location: 'Mexico City', description: 'A look back at the top CX trends of 2023.', images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'], recap: 'Experts discussed the impact of AI on customer experience and the rise of personalization.', downloadLink: '#' },
   { id: 2, name: 'Digital Transformation in CX', date: 'September 5, 2023', location: 'Virtual', description: 'Exploring how digital transformation is reshaping customer experience.', images: ['/placeholder.svg?height=300&width=400'], recap: 'Leaders shared case studies on successful digital transformation initiatives in CX.', downloadLink: '#' },
   { id: 3, name: 'CX Metrics that Matter', date: 'July 15, 2023', location: 'Guadalajara', description: 'Identifying and leveraging key CX metrics for business growth.', images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'], recap: 'Participants learned about new CX metrics and their impact on business outcomes.', downloadLink: '#' },
   { id: 4, name: 'Employee Experience Summit', date: 'May 20, 2023', location: 'Monterrey', description: 'Exploring the link between employee experience and customer experience.', images: ['/placeholder.svg?height=300&width=400'], recap: 'The event highlighted strategies for improving EX to enhance CX.', downloadLink: '#' },
   { id: 5, name: 'CX in the Age of AI', date: 'March 8, 2023', location: 'Virtual', description: 'Examining the role of artificial intelligence in shaping customer experiences.', images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'], recap: 'Experts shared insights on AI applications in CX and future trends.', downloadLink: '#' },
   { id: 6, name: 'Voice of Customer Workshop', date: 'January 25, 2023', location: 'Mexico City', description: 'Hands-on session on collecting and analyzing customer feedback.', images: ['/placeholder.svg?height=300&width=400'], recap: 'Participants learned practical techniques for gathering and utilizing customer insights.', downloadLink: '#' },
 ]

 const itemsPerPage = 3
 const totalMemberPages = Math.ceil(members.length / itemsPerPage)
 const totalEventPages = Math.ceil(events.length / itemsPerPage)
 const totalPastEventPages = Math.ceil(pastEvents.length / itemsPerPage)

 const paginatedMembers = members.slice((currentMemberPage - 1) * itemsPerPage, currentMemberPage * itemsPerPage)
 const paginatedEvents = events.slice((currentEventPage - 1) * itemsPerPage, currentEventPage * itemsPerPage)
 const paginatedPastEvents = pastEvents.slice((currentPastEventPage - 1) * itemsPerPage, currentPastEventPage * itemsPerPage)

 const filteredMembers = members.filter(member => 
   member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
   member.company.toLowerCase().includes(searchQuery.toLowerCase())
 )

 const filteredEvents = events.filter(event => 
   event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
   event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
   event.description.toLowerCase().includes(searchQuery.toLowerCase())
 )

 useEffect(() => {
   const handleOutsideClick = (event: MouseEvent) => {
     const target = event.target as HTMLElement
     if (!target.closest('.menu-container') && !target.closest('button')) {
       setIsMenuOpen(false)
     }
   }

   document.addEventListener('click', handleOutsideClick)

   return () => {
     document.removeEventListener('click', handleOutsideClick)
   }
 }, [])

 return (
   <div className="min-h-screen bg-[#0A2240] text-white">
     {showConfetti && <Confetti />}
     <header className="bg-[#0A2240] text-white p-4 flex justify-between items-center">
       <div className="text-2xl font-bold">
         <span className="text-[#FFB81C]">CX</span>
         <span className="text-white"> Leaders</span>
         <span className="text-[#FFB81C] text-sm ml-1">MX</span>
       </div>
       <div className="flex items-center space-x-2">
         <Button variant="ghost" size="icon" onClick={toggleLanguage}>
           <Globe className="h-5 w-5" />
         </Button>
         {!isLoggedIn && (
           <Popover>
             <PopoverTrigger asChild>
               <Button variant="ghost" size="icon">
                 <User className="h-5 w-5" />
               </Button>
             </PopoverTrigger>
             <PopoverContent className="w-80">
               <Tabs defaultValue="login" className="w-full">
                 <TabsList className="grid w-full grid-cols-2">
                   <TabsTrigger value="login">{language === 'es' ? 'Iniciar Sesión' : 'Login'}</TabsTrigger>
                   <TabsTrigger value="register">{language === 'es' ? 'Registrarse' : 'Register'}</TabsTrigger>
                 </TabsList>
                 <TabsContent value="login">
                   <Card>
                     <CardHeader>
                       <CardTitle>{language === 'es' ? 'Iniciar Sesión' : 'Login'}</CardTitle>
                       <CardDescription>{language === 'es' ? 'Ingresa tus credenciales para acceder a tu cuenta.' : 'Enter your credentials to access your account.'}</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-2">
                       <div className="space-y-1">
                         <Input 
                           type="email" 
                           placeholder={language === 'es' ? 'Correo electrónico' : 'Email'} 
                           value={loginForm.email}
                           onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                         />
                       </div>
                       <div className="space-y-1">
                         <Input 
                           type="password" 
                           placeholder={language === 'es' ? 'Contraseña' : 'Password'} 
                           value={loginForm.password}
                           onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                         />
                       </div>
                     </CardContent>
                     <CardFooter>
                       <Button onClick={handleLogin}>{language === 'es' ? 'Iniciar Sesión' : 'Login'}</Button>
                     </CardFooter>
                   </Card>
                 </TabsContent>
                 <TabsContent value="register">
                   <Card>
                     <CardHeader>
                       <CardTitle>{language === 'es' ? 'Registrarse' : 'Register'}</CardTitle>
                       <CardDescription>{language === 'es' ? 'Crea una cuenta para unirte a nuestra CX Community.' : 'Create an account to join our CX Community.'}</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-2">
                       <div className="space-y-1">
                         <Input 
                           type="text" 
                           placeholder={language === 'es' ? 'Nombre' : 'Name'} 
                           value={registerForm.name}
                           onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                         />
                       </div>
                       <div className="space-y-1">
                         <Input 
                           type="email" 
                           placeholder={language === 'es' ? 'Correo electrónico' : 'Email'} 
                           value={registerForm.email}
                           onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                         />
                       </div>
                       <div className="space-y-1">
                         <Input 
                           type="password" 
                           placeholder={language === 'es' ? 'Contraseña' : 'Password'} 
                           value={registerForm.password}
                           onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                         />
                       </div>
                     </CardContent>
                     <CardFooter>
                       <Button onClick={handleRegister}>{language === 'es' ? 'Registrarse' : 'Register'}</Button>
                     </CardFooter>
                   </Card>
                 </TabsContent>
               </Tabs>
             </PopoverContent>
           </Popover>
         )}
         <Button variant="ghost" size="icon" onClick={toggleMenu}>
           {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
         </Button>
       </div>
     </header>

     {isMenuOpen && (
       <nav className="bg-[#0A2240] text-white p-4 menu-container">
         <ul className="space-y-2">
           {['Home', 'Events', 'Members', 'Profile', 'Contact'].map((item) => (
             <li key={item}>
               <Button
                 variant="ghost"
                 className="w-full justify-start"
                 onClick={() => {
                   setActiveTab(item.toLowerCase())
                   setIsMenuOpen(false)
                 }}
               >
                 {language === 'es' ? {
                   'Home': 'Inicio',
                   'Events': 'Eventos',
                   'Members': 'Miembros',
                   'Profile': 'Perfil',
                   'Contact': 'Contacto'
                 }[item] : item}
               </Button>
             </li>
           ))}
         </ul>
       </nav>
     )}

     <main className="p-4">
       <Tabs value={activeTab} onValueChange={setActiveTab}>
         <TabsList className="grid w-full grid-cols-3 bg-[#0A2240] mb-4">
           <TabsTrigger value="home"><Home className="h-5 w-5" /></TabsTrigger>
           <TabsTrigger value="events"><Calendar className="h-5 w-5" /></TabsTrigger>
           <TabsTrigger value="members"><Users className="h-5 w-5" /></TabsTrigger>
         </TabsList>
         <TabsContent value="home">
           <Card className="bg-[#0A2240] border-[#FFB81C]">
             <CardHeader>
               <CardTitle className="text-[#FFB81C] text-3xl break-words">
                 {language === 'es' ? '¡Bienvenidos a la CX Community de Líderes CX!' : 'Welcome to CX Leaders CX Community!'}
               </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <p className="text-white">
                 {language === 'es' 
                   ? 'Únete a nuestra CX Community de profesionales de Experiencia del Cliente. Conecta, aprende y crece con nosotros.'
                   : 'Join our CX Community of Customer Experience professionals. Connect, learn, and grow together.'}
               </p>
               <div className="flex flex-col sm:flex-row gap-2">
                 <Button 
                   className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700]"
                   onClick={() => setActiveTab('events')}
                 >
                   {language === 'es' ? 'Explorar Eventos' : 'Explore Events'}
                 </Button>
                 <Button 
                   className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700]"
                   onClick={() => setActiveTab('members')}
                 >
                   {language === 'es' ? 'Conocer Miembros' : 'Meet Members'}
                 </Button>
               </div>
               <div className="mt-4">
                 <h3 className="text-[#FFB81C] text-xl mb-2">{language === 'es' ? 'Únete a nuestro Grupo de WhatsApp' : 'Join our WhatsApp Group'}</h3>
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                   <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UNETECXCOM-8PQ8woUZcty1BUkiulZmFFOC1lBoGl.jpg" alt="WhatsApp QR Code" className="w-40 h-40" />
                   <div>
                     <p className="text-white mb-2">{language === 'es' ? 'Escanea el código QR o haz clic en el enlace:' : 'Scan the QR code or click the link below:'}</p>
                     <a href="https://chat.whatsapp.com/DKlAYAnIcxSFnIk5rTIlPg" target="_blank" rel="noopener noreferrer" className="text-[#FFB81C] hover:underline">
                       {language === 'es' ? 'Unirse al Grupo de WhatsApp' : 'Join WhatsApp Group'}
                     </a>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         </TabsContent>
         <TabsContent value="events">
           <Card className="bg-[#0A2240] border-[#FFB81C]">
             <CardHeader>
               <CardTitle className="text-[#FFB81C] break-words">{language === 'es' ? 'Próximos Eventos' : 'Upcoming Events'}</CardTitle>
             </CardHeader>
             <CardContent>
               {isLoggedIn && (
                 <Input 
                   type="text" 
                   placeholder={language === 'es' ? 'Buscar eventos...' : 'Search events...'} 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="mb-4"
                 />
               )}
               {isLoggedIn ? filteredEvents.map((event) => (
                 <Dialog key={event.id}>
                   <DialogTrigger asChild>
                     <div className="mb-4 p-4 bg-white text-black rounded-lg cursor-pointer hover:bg-gray-100 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center">
                       <div className="mb-2 sm:mb-0">
                         <h3 className="font-bold text-[#0A2240]">{event.name}</h3>
                         <p>{language === 'es' ? `Fecha: ${event.date}` : `Date: ${event.date}`}</p>
                         <p>{language === 'es' ? `Ubicación: ${event.location}` : `Location: ${event.location}`}</p>
                       </div>
                       <Button 
                         variant="outline" 
                         className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] mt-2 sm:mt-0"
                         onClick={(e) => {
                           e.stopPropagation()
                           handleVolunteer(event.id)
                         }}
                       >
                         <HandHeart className="mr-2 h-4 w-4" />
                         {language === 'es' ? 'Voluntario' : 'Volunteer'}
                       </Button>
                     </div>
                   </DialogTrigger>
                   <DialogContent className="bg-white text-black max-w-[90vw] w-full sm:max-w-[425px]">
                     <DialogHeader>
                       <DialogTitle className="text-[#0A2240]">{event.name}</DialogTitle>
                     </DialogHeader>
                     <div className="mt-2">
                       <img src={event.image} alt={event.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                       <p><strong>{language === 'es' ? 'Fecha:' : 'Date:'}</strong> {event.date}</p>
                       <p><strong>{language === 'es' ? 'Ubicación:' : 'Location:'}</strong> {event.location}</p>
                       <p className="mt-2"><strong>{language === 'es' ? 'Descripción:' : 'Description:'}</strong> {event.description}</p>
                       <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                         <Button 
                           variant="outline" 
                           className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] w-full sm:w-auto"
                           onClick={() => window.open(event.mapLink, '_blank')}
                         >
                           <MapPin className="mr-2 h-4 w-4" />
                           {language === 'es' ? 'Ver en Mapa' : 'View on Map'}
                         </Button>
                         <Button 
                           variant="outline" 
                           className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] w-full sm:w-auto"
                           onClick={() => handleAddToCalendar(event)}
                         >
                           <Plus className="mr-2 h-4 w-4" />
                           {language === 'es' ? 'Añadir al Calendario' : 'Add to Calendar'}
                         </Button>
                       </div>
                     </div>
                   </DialogContent>
                 </Dialog>
               )) : paginatedEvents.map((event) => (
                 <Dialog key={event.id}>
                   <DialogTrigger asChild>
                     <div className="mb-4 p-4 bg-white text-black rounded-lg cursor-pointer hover:bg-gray-100 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center">
                       <div className="mb-2 sm:mb-0">
                         <h3 className="font-bold text-[#0A2240]">{event.name}</h3>
                         <p>{language === 'es' ? `Fecha: ${event.date}` : `Date: ${event.date}`}</p>
                         <p>{language === 'es' ? `Ubicación: ${event.location}` : `Location: ${event.location}`}</p>
                       </div>
                       <Button 
                         variant="outline" 
                         className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] mt-2 sm:mt-0"
                         onClick={(e) => {
                           e.stopPropagation()
                           handleVolunteer(event.id)
                         }}
                       >
                         <HandHeart className="mr-2 h-4 w-4" />
                         {language === 'es' ? 'Voluntario' : 'Volunteer'}
                       </Button>
                     </div>
                   </DialogTrigger>
                   <DialogContent className="bg-white text-black max-w-[90vw] w-full sm:max-w-[425px]">
                     <DialogHeader>
                       <DialogTitle className="text-[#0A2240]">{event.name}</DialogTitle>
                     </DialogHeader>
                     <div className="mt-2">
                       <img src={event.image} alt={event.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                       <p><strong>{language === 'es' ? 'Fecha:' : 'Date:'}</strong> {event.date}</p>
                       <p><strong>{language === 'es' ? 'Ubicación:' : 'Location:'}</strong> {event.location}</p>
                       <p className="mt-2"><strong>{language === 'es' ? 'Descripción:' : 'Description:'}</strong> {event.description}</p>
                       <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                         <Button 
                           variant="outline" 
                           className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] w-full sm:w-auto"
                           onClick={() => window.open(event.mapLink, '_blank')}
                         >
                           <MapPin className="mr-2 h-4 w-4" />
                           {language === 'es' ? 'Ver en Mapa' : 'View on Map'}
                         </Button>
                         <Button 
                           variant="outline" 
                           className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] w-full sm:w-auto"
                           onClick={() => handleAddToCalendar(event)}
                         >
                           <Plus className="mr-2 h-4 w-4" />
                           {language === 'es' ? 'Añadir al Calendario' : 'Add to Calendar'}
                         </Button>
                       </div>
                     </div>
                   </DialogContent>
                 </Dialog>
               ))}
               {!isLoggedIn && (
                 <div className="flex justify-between items-center mt-4">
                   <Button
                     onClick={() => setCurrentEventPage(prev => Math.max(prev - 1, 1))}
                     disabled={currentEventPage === 1}
                   >
                     <ChevronLeft className="h-4 w-4" />
                     <span className="text-white">{language === 'es' ? 'Anterior' : 'Previous'}</span>
                   </Button>
                   <span className="text-white">{language === 'es' ? `Página ${currentEventPage} de ${totalEventPages}` : `Page ${currentEventPage} of ${totalEventPages}`}</span>
                   <Button
                     onClick={() => setCurrentEventPage(prev => Math.min(prev + 1, totalEventPages))}
                     disabled={currentEventPage === totalEventPages}
                   >
                     <span className="text-white">{language === 'es' ? 'Siguiente' : 'Next'}</span>
                     <ChevronRight className="h-4 w-4" />
                   </Button>
                 </div>
               )}
               <Button 
                 className="w-full mt-4 bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700]"
                 onClick={() => setShowPastEvents(!showPastEvents)}
               >
                 {language === 'es' ? 'Eventos Pasados' : 'Past Events'}
               </Button>
               {showPastEvents && (
                 <div className="mt-4">
                   <h3 className="text-[#FFB81C] text-xl mb-2">{language === 'es' ? 'Eventos Pasados' : 'Past Events'}</h3>
                   {paginatedPastEvents.map((event) => (
                     <Dialog key={event.id}>
                       <DialogTrigger asChild>
                         <div className="mb-4 p-4 bg-white text-black rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                           <h3 className="font-bold text-[#0A2240]">{event.name}</h3>
                           <p>{language === 'es' ? `Fecha: ${event.date}` : `Date: ${event.date}`}</p>
                           <p>{language === 'es' ? `Ubicación: ${event.location}` : `Location: ${event.location}`}</p>
                         </div>
                       </DialogTrigger>
                       <DialogContent className="bg-white text-black max-w-[90vw] w-full sm:max-w-[425px]">
                         <DialogHeader>
                           <DialogTitle className="text-[#0A2240]">{event.name}</DialogTitle>
                         </DialogHeader>
                         <div className="mt-2">
                           <div className="flex overflow-x-auto space-x-2 mb-4">
                             {event.images.map((img, index) => (
                               <img key={index} src={img} alt={`${event.name} image ${index + 1}`} className="w-40 h-40 object-cover rounded-lg" />
                             ))}
                           </div>
                           <p><strong>{language === 'es' ? 'Fecha:' : 'Date:'}</strong> {event.date}</p>
                           <p><strong>{language === 'es' ? 'Ubicación:' : 'Location:'}</strong> {event.location}</p>
                           <p className="mt-2"><strong>{language === 'es' ? 'Resumen:' : 'Recap:'}</strong> {event.recap}</p>
                           <Button 
                             className="mt-4 bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700]"
                             onClick={() => window.open(event.downloadLink, '_blank')}
                           >
                             {language === 'es' ? 'Descargar Memorias' : 'Download Memories'}
                           </Button>
                         </div>
                       </DialogContent>
                     </Dialog>
                   ))}
                   <div className="flex justify-between items-center mt-4">
                     <Button
                       onClick={() => setCurrentPastEventPage(prev => Math.max(prev - 1, 1))}
                       disabled={currentPastEventPage === 1}
                     >
                       <ChevronLeft className="h-4 w-4" />
                       <span className="text-white">{language === 'es' ? 'Anterior' : 'Previous'}</span>
                     </Button>
                     <span className="text-white">{language === 'es' ? `Página ${currentPastEventPage} de ${totalPastEventPages}` : `Page ${currentPastEventPage} of ${totalPastEventPages}`}</span>
                     <Button
                       onClick={() => setCurrentPastEventPage(prev => Math.min(prev + 1, totalPastEventPages))}
                       disabled={currentPastEventPage === totalPastEventPages}
                     >
                       <span className="text-white">{language === 'es' ? 'Siguiente' : 'Next'}</span>
                       <ChevronRight className="h-4 w-4" />
                     </Button>
                   </div>
                 </div>
               )}
             </CardContent>
           </Card>
         </TabsContent>
         <TabsContent value="members">
           <Card className="bg-[#0A2240] border-[#FFB81C]">
             <CardHeader>
               <CardTitle className="text-[#FFB81C] break-words">{language === 'es' ? 'Miembros de la CX Community' : 'CX Community Members'}</CardTitle>
             </CardHeader>
             <CardContent>
               {isLoggedIn && (
                 <Input 
                   type="text" 
                   placeholder={language === 'es' ? 'Buscar miembros...' : 'Search members...'} 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="mb-4"
                 />
               )}
               {isLoggedIn ? filteredMembers.map((member) => (
                 <Dialog key={member.id}>
                   <DialogTrigger asChild>
                     <div className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-[#0A2240]/80 p-2 rounded-lg transition-colors">
                       <Avatar>
                         <AvatarImage src={member.image} />
                         <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-medium text-[#FFB81C]">{member.name}</p>
                         <p className="text-sm text-white">{member.title} at {member.company}</p>
                       </div>
                     </div>
                   </DialogTrigger>
                   <DialogContent className="bg-white text-black max-w-[90vw] w-full sm:max-w-[425px]">
                     <DialogHeader>
                       <DialogTitle className="text-[#0A2240]">{member.name}</DialogTitle>
                     </DialogHeader>
                     <div className="mt-2">
                       <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                       <p><strong>{language === 'es' ? 'Cargo:' : 'Title:'}</strong> {member.title}</p>
                       <p><strong>{language === 'es' ? 'Empresa:' : 'Company:'}</strong> {member.company}</p>
                       <p className="mt-2"><strong>{language === 'es' ? 'Biografía:' : 'Bio:'}</strong> {member.bio}</p>
                       <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                         <Button 
                           variant="outline" 
                           className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] w-full sm:w-auto"
                           onClick={() => window.open(member.linkedin, '_blank')}
                         >
                           <Linkedin className="mr-2 h-4 w-4" />
                           {language === 'es' ? 'Perfil de LinkedIn' : 'LinkedIn Profile'}
                         </Button>
                         <Dialog>
                           <DialogTrigger asChild>
                             <Button 
                               variant="outline" 
                               className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] w-full sm:w-auto"
                             >
                               {language === 'es' ? 'Ver Credencial' : 'See Badge'}
                             </Button>
                           </DialogTrigger>
                           <DialogContent className="bg-white p-0 max-w-[90vw] w-full sm:max-w-[425px]">
                             <div className="bg-[#0A2240] text-white p-4 rounded-t-lg relative">
                               <Button 
                                 className="absolute top-2 right-2 text-white hover:bg-[#0A2240]/50" 
                                 variant="ghost" 
                                 size="icon"
                                 onClick={() => document.querySelector('[data-state="open"]')?.dispatchEvent(new Event('close'))}
                               >
                                 <X className="h-4 w-4" />
                               </Button>
                               <div className="text-2xl font-bold mb-4">
                                 <span className="text-[#FFB81C]">CX</span>
                                 <span className="text-white"> Leaders</span>
                                 <span className="text-[#FFB81C] text-sm ml-1">MX</span>
                               </div>
                               <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                               <h2 className="text-2xl font-bold mt-2 text-center">{member.name}</h2>
                               <p className="text-lg text-center">{member.title}</p>
                               <p className="text-md text-center">{member.company}</p>
                             </div>
                             <div className="p-4">
                               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(member.linkedin)}`} alt="QR Code" className="mx-auto" />
                               <p className="text-center mt-2 text-sm text-gray-600">{language === 'es' ? 'Escanea para ver el perfil de LinkedIn' : 'Scan to view LinkedIn profile'}</p>
                             </div>
                           </DialogContent>
                         </Dialog>
                       </div>
                     </div>
                   </DialogContent>
                 </Dialog>
               )) : paginatedMembers.map((member) => (
                 <Dialog key={member.id}>
                   <DialogTrigger asChild>
                     <div className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-[#0A2240]/80 p-2 rounded-lg transition-colors">
                       <Avatar>
                         <AvatarImage src={member.image} />
                         <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                       </Avatar>
                       <div>
                         <p className="font-medium text-[#FFB81C]">{member.name}</p>
                         <p className="text-sm text-white">{member.title} at {member.company}</p>
                       </div>
                     </div>
                   </DialogTrigger>
                   <DialogContent className="bg-white text-black max-w-[90vw] w-full sm:max-w-[425px]">
                     <DialogHeader>
                       <DialogTitle className="text-[#0A2240]">{member.name}</DialogTitle>
                     </DialogHeader>
                     <div className="mt-2">
                       <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                       <p><strong>{language === 'es' ? 'Cargo:' : 'Title:'}</strong> {member.title}</p>
                       <p><strong>{language === 'es' ? 'Empresa:' : 'Company:'}</strong> {member.company}</p>
                       <p className="mt-2"><strong>{language === 'es' ? 'Biografía:' : 'Bio:'}</strong> {member.bio}</p>
                       <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                         <Button 
                           variant="outline" 
                           className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] w-full sm:w-auto"
                           onClick={() => window.open(member.linkedin, '_blank')}
                         >
                           <Linkedin className="mr-2 h-4 w-4" />
                           {language === 'es' ? 'Perfil de LinkedIn' : 'LinkedIn Profile'}
                         </Button>
                         <Dialog>
                           <DialogTrigger asChild>
                             <Button 
                               variant="outline" 
                               className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700] w-full sm:w-auto"
                             >
                               {language === 'es' ? 'Ver Credencial' : 'See Badge'}
                             </Button>
                           </DialogTrigger>
                           <DialogContent className="bg-white p-0 max-w-[90vw] w-full sm:max-w-[425px]">
                             <div className="bg-[#0A2240] text-white p-4 rounded-t-lg relative">
                               <Button 
                                 className="absolute top-2 right-2 text-white hover:bg-[#0A2240]/50" 
                                 variant="ghost" 
                                 size="icon"
                                 onClick={() => document.querySelector('[data-state="open"]')?.dispatchEvent(new Event('close'))}
                               >
                                 <X className="h-4 w-4" />
                               </Button>
                               <div className="text-2xl font-bold mb-4">
                                 <span className="text-[#FFB81C]">CX</span>
                                 <span className="text-white"> Leaders</span>
                                 <span className="text-[#FFB81C] text-sm ml-1">MX</span>
                               </div>
                               <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                               <h2 className="text-2xl font-bold mt-2 text-center">{member.name}</h2>
                               <p className="text-lg text-center">{member.title}</p>
                               <p className="text-md text-center">{member.company}</p>
                             </div>
                             <div className="p-4">
                               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(member.linkedin)}`} alt="QR Code" className="mx-auto" />
                               <p className="text-center mt-2 text-sm text-gray-600">{language === 'es' ? 'Escanea para ver el perfil de LinkedIn' : 'Scan to view LinkedIn profile'}</p>
                             </div>
                           </DialogContent>
                         </Dialog>
                       </div>
                     </div>
                   </DialogContent>
                 </Dialog>
               ))}
               {!isLoggedIn && (
                 <div className="flex justify-between items-center mt-4">
                   <Button
                     onClick={() => setCurrentMemberPage(prev => Math.max(prev - 1, 1))}
                     disabled={currentMemberPage === 1}
                   >
                     <ChevronLeft className="h-4 w-4" />
                     <span className="text-white">{language === 'es' ? 'Anterior' : 'Previous'}</span>
                   </Button>
                   <span className="text-white">{language === 'es' ? `Página ${currentMemberPage} de ${totalMemberPages}` : `Page ${currentMemberPage} of ${totalMemberPages}`}</span>
                   <Button
                     onClick={() => setCurrentMemberPage(prev => Math.min(prev + 1, totalMemberPages))}
                     disabled={currentMemberPage === totalMemberPages}
                   >
                     <span className="text-white">{language === 'es' ? 'Siguiente' : 'Next'}</span>
                     <ChevronRight className="h-4 w-4" />
                   </Button>
                 </div>
               )}
             </CardContent>
           </Card>
         </TabsContent>
       </Tabs>

       {isLoggedIn && (
         <Card className="bg-[#0A2240] border-[#FFB81C] mt-4">
           <CardHeader>
             <CardTitle className="text-[#FFB81C]">{language === 'es' ? 'Tu Perfil' : 'Your Profile'}</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               <div className="flex items-center space-x-4">
                 <Avatar className="h-20 w-20">
                   <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                   <AvatarFallback>JD</AvatarFallback>
                 </Avatar>
                 <div>
                   <h3 className="font-bold text-[#FFB81C]">{language === 'es' ? 'Juan Pérez' : 'John Doe'}</h3>
                   <p className="text-sm text-white">{language === 'es' ? 'Gerente CX' : 'CX Manager'}</p>
                 </div>
               </div>
               <div>
                 <h4 className="font-medium text-[#FFB81C]">{language === 'es' ? 'Tu Código QR' : 'Your QR Code'}</h4>
                 <div className="mt-2 bg-white p-4 rounded-lg">
                   <img src="/placeholder.svg" alt="QR Code" className="w-full max-w-[200px] mx-auto" />
                 </div>
               </div>
               <div className="flex flex-col sm:flex-row gap-2">
                 <Button 
                   className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700]"
                   onClick={() => setShowEditProfileDialog(true)}
                 >
                   <Edit className="mr-2 h-4 w-4" />
                   {language === 'es' ? 'Editar Perfil' : 'Edit Profile'}
                 </Button>
                 <Button 
                   className="bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700]"
                   onClick={() => setShowAddPhotoDialog(true)}
                 >
                   <Camera className="mr-2 h-4 w-4" />
                   {language === 'es' ? 'Añadir Foto' : 'Add Photo'}
                 </Button>
               </div>
             </div>
           </CardContent>
           <CardFooter>
             <Button onClick={() => setIsLoggedIn(false)} variant="outline" className="w-full border-[#FFB81C] text-[#FFB81C] hover:bg-[#FFB81C] hover:text-[#0A2240]">
               {language === 'es' ? 'Cerrar Sesión' : 'Log Out'}
             </Button>
           </CardFooter>
         </Card>
       )}

       {activeTab === 'contact' && (
         <Card className="bg-[#0A2240] border-[#FFB81C] mt-4">
           <CardHeader>
             <CardTitle className="text-[#FFB81C]">{language === 'es' ? 'Contacto' : 'Contact'}</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               <div className="flex items-center space-x-4">
                 <Avatar className="h-20 w-20">
                   <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Andres Jaramillo" />
                   <AvatarFallback>AJ</AvatarFallback>
                 </Avatar>
                 <div>
                   <h3 className="font-bold text-[#FFB81C]">ANDRES JARAMILLO</h3>
                   <p className="text-sm text-white">+52 1 55 3998 0738</p>
                 </div>
               </div>
               <div>
                 <h4 className="font-medium text-[#FFB81C] mb-2">{language === 'es' ? 'WhatsApp QR' : 'WhatsApp QR'}</h4>
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/525539980738`} alt="WhatsApp QR Code" className="w-40 h-40" />
               </div>
               <a href="https://wa.me/525539980738" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#FFB81C] hover:underline">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="mr-2 h-4 w-4" />
                 {language === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
               </a>
             </div>
           </CardContent>
         </Card>
       )}
     </main>

     <Dialog open={showAddPhotoDialog} onOpenChange={setShowAddPhotoDialog}>
       <DialogContent className="bg-white text-black max-w-[90vw] w-full sm:max-w-[425px]">
         <DialogHeader>
           <DialogTitle className="text-[#0A2240]">{language === 'es' ? 'Añadir Foto' : 'Add Photo'}</DialogTitle>
         </DialogHeader>
         <div className="mt-2">
           <Input type="file" accept="image/*" />
           <Button className="mt-4 bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700]" onClick={() => setShowAddPhotoDialog(false)}>
             {language === 'es' ? 'Subir Foto' : 'Upload Photo'}
           </Button>
         </div>
       </DialogContent>
     </Dialog>

     <Dialog open={showEditProfileDialog} onOpenChange={setShowEditProfileDialog}>
       <DialogContent className="bg-white text-black max-w-[90vw] w-full sm:max-w-[425px]">
         <DialogHeader>
           <DialogTitle className="text-[#0A2240]">{language === 'es' ? 'Editar Perfil' : 'Edit Profile'}</DialogTitle>
         </DialogHeader>
         <div className="mt-2 space-y-4">
           <Input 
             type="text" 
             placeholder={language === 'es' ? 'Nombre' : 'Name'} 
             value={editProfileForm.name}
             onChange={(e) => setEditProfileForm({...editProfileForm, name: e.target.value})}
           />
           <Input 
             type="text" 
             placeholder={language === 'es' ? 'Empresa' : 'Company'} 
             value={editProfileForm.company}
             onChange={(e) => setEditProfileForm({...editProfileForm, company: e.target.value})}
           />
           <Input 
             type="text" 
             placeholder={language === 'es' ? 'Cargo' : 'Role'} 
             value={editProfileForm.role}
             onChange={(e) => setEditProfileForm({...editProfileForm, role: e.target.value})}
           />
           <Input 
             type="text" 
             placeholder="LinkedIn" 
             value={editProfileForm.linkedin}
             onChange={(e) => setEditProfileForm({...editProfileForm, linkedin: e.target.value})}
           />
           <Input 
             type="tel" 
             placeholder={language === 'es' ? 'Celular' : 'Cellphone'} 
             value={editProfileForm.cellphone}
             onChange={(e) => setEditProfileForm({...editProfileForm, cellphone: e.target.value})}
           />
           <Button className="w-full bg-[#FFB81C] text-[#0A2240] hover:bg-[#FFD700]" onClick={() => setShowEditProfileDialog(false)}>
             {language === 'es' ? 'Guardar Cambios' : 'Save Changes'}
           </Button>
         </div>
       </DialogContent>
     </Dialog>
   </div>
 )
}