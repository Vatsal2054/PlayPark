import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import type { SignUpCredentials } from '@/context/AuthContext';

export default function AuthPage() {
  const { credentials, setCredentials, loginUser, signUpUser } = useContext(AuthContext);
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === '/signup');
  const [signUpData, setSignUpData] = useState<SignUpCredentials>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    setIsSignUp(location.pathname === '/signup')
  }, [location.pathname])

  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await loginUser();
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleSignUp = async () => {
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const signUpCredentials = {
      username: `${signUpData.firstName} ${signUpData.lastName}`,
      email: signUpData.email,
      password: signUpData.password,
    };

    const success = await signUpUser(signUpCredentials);
    if (success) {
      // Switch to login mode after successful signup
      navigate('/login');
      setIsSignUp(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-muted">
      <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden flex md:flex-row flex-col">
        {/* Left section */}
        <div className="p-10 flex flex-col justify-center flex-1">
          <div className="max-w-[70%] mx-auto w-full">
            <h1 className="text-4xl font-[800] mb-2">
              {isSignUp ? (
                <>
                  Hey,
                  <br />
                  Create Account
                </>
              ) : (
                <>
                  Holla,
                  <br />
                  Welcome Back
                </>
              )}
            </h1>

            <p className="text-muted-foreground text-lg mb-6">
              {isSignUp
                ? 'Join our community and start your journey'
                : 'Hey, welcome back to your special place'}
            </p>

            <div className="space-y-4">
              {isSignUp && (
                <>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={signUpData.firstName}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={signUpData.lastName}
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="startey@gmail.com"
                  value={isSignUp ? signUpData.email : credentials.email}
                  onChange={(e) => {
                    if (isSignUp) {
                      setSignUpData({ ...signUpData, email: e.target.value });
                    } else {
                      setCredentials({ ...credentials, email: e.target.value });
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={isSignUp ? signUpData.password : credentials.password}
                  onChange={(e) => {
                    if (isSignUp) {
                      setSignUpData({
                        ...signUpData,
                        password: e.target.value,
                      });
                    } else {
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      });
                    }
                  }}
                />
              </div>

              {isSignUp && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              {isSignUp && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      className="text-purple-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/privacy"
                      className="text-purple-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              )}

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-2 cursor-pointer"
                onClick={isSignUp ? handleSignUp : handleLogin}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>

              <p className="text-center text-[.9rem] text-muted-foreground">
                {isSignUp
                  ? 'Already have an account?'
                  : "Don't have an account?"}{' '}
                <button
                  onClick={() => isSignUp ? navigate('/login') : navigate('/signup')}
                  className="text-purple-600 hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right section (image placeholder) */}
        <div className="hidden md:block flex-1 relative">
          <div
            className="absolute inset-4 bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: `url('/login.png')`,
            }}
          />
        </div>
      </div>
    </main>
  );
}
