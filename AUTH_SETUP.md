# NextAuth with GitHub Setup Guide

This project has been configured with NextAuth.js v5 and GitHub OAuth authentication.

## Setup Steps

### 1. GitHub OAuth App Configuration

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the following details:
   - **Application name**: ETMA (or your preferred name)
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret**

### 2. Environment Variables

Update your `.env.local` file with the actual values:

```env
# GitHub OAuth
GITHUB_ID=your_actual_github_client_id
GITHUB_SECRET=your_actual_github_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string_here
```

**Important**: Generate a random string for `NEXTAUTH_SECRET`. You can use:
```bash
openssl rand -base64 32
```

### 3. Start the Development Server

```bash
npm run dev
```

## Features

- **GitHub OAuth Authentication**: Users can sign in with their GitHub accounts
- **Protected Routes**: Use the `ProtectedRoute` component to protect pages
- **Session Management**: Automatic session handling with NextAuth
- **User Profile**: Display user information and sign out functionality
- **Responsive UI**: Modern, responsive authentication pages

## Components

- `SessionProvider`: Wraps the app with authentication context
- `ProtectedRoute`: Protects routes from unauthenticated users
- `UserProfile`: Displays user information and sign out button
- `useAuth`: Custom hook for authentication state and functions

## Usage Examples

### Protecting a Route

```tsx
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  )
}
```

### Using Authentication State

```tsx
import { useAuth } from "@/hooks/use-auth"

export default function MyComponent() {
  const { user, isAuthenticated, signOut } = useAuth()

  if (!isAuthenticated) {
    return <div>Please sign in</div>
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

## API Routes

- `/api/auth/[...nextauth]`: NextAuth API endpoint
- `/auth/login`: Login page
- `/auth/register`: Registration page
- `/auth`: Main authentication page

## Security Notes

- Never commit your `.env.local` file to version control
- Use strong, random secrets for production
- Consider implementing additional security measures for production use
- GitHub OAuth tokens are automatically handled by NextAuth

## Troubleshooting

1. **"Invalid OAuth redirect URI"**: Ensure the callback URL in GitHub matches exactly
2. **Environment variables not loading**: Restart your development server after updating `.env.local`
3. **Authentication not working**: Check browser console for errors and verify environment variables
4. **Session not persisting**: Ensure `NEXTAUTH_SECRET` is set and consistent

## Production Deployment

For production, update the following:
- Set `NEXTAUTH_URL` to your production domain
- Use a strong, random `NEXTAUTH_SECRET`
- Update GitHub OAuth app callback URL to your production domain
- Consider using a database adapter for session storage
