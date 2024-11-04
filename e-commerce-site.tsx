'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock product data
const products = [
  { id: 1, name: "Laptop", price: 999.99, description: "High-performance laptop for all your computing needs", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Smartphone", price: 699.99, description: "Latest smartphone with advanced features", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Headphones", price: 199.99, description: "Noise-cancelling headphones for immersive audio experience", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Smartwatch", price: 299.99, description: "Fitness tracker and smartwatch in one sleek device", image: "/placeholder.svg?height=200&width=200" },
]

// Layout component
const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">E-Shop</Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/products" className="hover:underline">Products</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Open cart</span>
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {cart.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center my-2">
                        <span>{item.name} - ${item.price.toFixed(2)}</span>
                        <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                      </div>
                    ))}
                    <div className="mt-4">
                      <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
                      <Button className="w-full mt-2">Checkout</Button>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                  <Link href="/" className="hover:underline">Home</Link>
                  <Link href="/products" className="hover:underline">Products</Link>
                  <Link href="/about" className="hover:underline">About</Link>
                  <Link href="/contact" className="hover:underline">Contact</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-muted mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2023 E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

// Product listing page
const ProductListing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Card key={product.id}>
          <CardHeader>
            <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-48 object-cover" />
          </CardHeader>
          <CardContent>
            <CardTitle>{product.name}</CardTitle>
            <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/product/${product.id}`} passHref>
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

// Product detail page
const ProductDetail = ({ product, addToCart }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <Image src={product.image} alt={product.name} width={400} height={400} className="w-full h-auto" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
        <p className="mb-6">{product.description}</p>
        <Button onClick={() => addToCart(product)} className="w-full">Add to Cart</Button>
      </div>
    </div>
  )
}

// Checkout form
const CheckoutForm = ({ cart, totalPrice }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the order data to a server
    console.log('Order submitted:', { ...formData, cart, totalPrice })
    alert('Order placed successfully!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="zipCode"
        placeholder="Zip Code"
        value={formData.zipCode}
        onChange={handleChange}
        required
      />
      <div className="border-t pt-4">
        <p className="font-bold mb-2">Order Summary:</p>
        {cart.map(item => (
          <p key={item.id}>{item.name} - ${item.price.toFixed(2)}</p>
        ))}
        <p className="font-bold mt-2">Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <Button type="submit" className="w-full">Place Order</Button>
    </form>
  )
}

// Main component
export default function Component() {
  const [cart, setCart] = useState([])
  const router = useRouter()
  const { productId } = router.query

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <Layout>
      {productId ? (
        <ProductDetail 
          product={products.find(p => p.id === parseInt(productId))} 
          addToCart={addToCart} 
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          <ProductListing />
        </>
      )}
      {cart.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <CheckoutForm cart={cart} totalPrice={totalPrice} />
        </div>
      )}
    </Layout>
  )
}