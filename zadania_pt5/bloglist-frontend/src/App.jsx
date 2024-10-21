/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [loginVisible, setLoginVisible] = useState(false)
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)
	const [user, setUser] = useState(null)

	const blogFormRef = useRef()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
			getAllBlogs()
		}
	}, [])

	const getAllBlogs = async () => {
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	const createBlog = async (BlogToAdd) => {
		try {
			blogFormRef.current.toggleVisibility()
			const createdBlog = await blogService
				.create(BlogToAdd)
			setSuccessMessage(
				`Blog ${BlogToAdd.title} was successfully added`
			)
			setBlogs(blogs.concat(createdBlog))
			setErrorMessage(null)
			setTimeout(() => {
				setSuccessMessage(null)
			}, 5000)
		} catch (exception) {
			setErrorMessage(
				`Cannot add blog ${BlogToAdd.title} ${exception}`
			)
			setSuccessMessage(null)
			setTimeout(() => {
				setSuccessMessage(null)
			}, 4000)
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 4000)
		}
	}

	const handleLogout = async (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const loginForm = () => {
		const hideWhenVisible = { display: loginVisible ? 'none' : '' }
		const showWhenVisible = { display: loginVisible ? '' : 'none' }

		return (
			<>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>log in</button>
				</div>
				<div style={showWhenVisible}>
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
					<button onClick={() => setLoginVisible(false)}>cancel</button>
				</div>
			</>
		)
	}

	return (
		<>
			<h2>Blogs</h2>
			<Notification errorMessage={errorMessage} successMessage={successMessage} />
			{user === null ?
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					setUsername={setUsername}
					setPassword={setPassword}
					password={password}
				/> :
				<div>
					<p>{user.name} logged in <button onClick={handleLogout} type="submit">logout</button></p>
					<Togglable buttonLabel="Add new blog" ref={blogFormRef}>
						<BlogForm
							createBlog={createBlog}
						/>
					</Togglable>
					{blogs.sort().map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
						// updateBlog={updateBlog}
						// deleteBlog={deleteBlog}
						/>
					)}
				</div>
			}
		</>
	)
}


export default App