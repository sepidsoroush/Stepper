import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface StepContentProps {
  step: number;
}

const DummyContent = ({ step }: StepContentProps) => {
  switch (step) {
    case 1:
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="Enter your first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Enter your last name" />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="Enter your phone number" />
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Choose a username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Choose a password" />
          </div>
        </div>
      );
    default:
      return <div>Unknown step</div>;
  }
};

export default DummyContent;
