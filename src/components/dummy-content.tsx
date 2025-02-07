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
            <Label htmlFor="firstName" className="text-primary dark:text-secondary">First Name</Label>
            <Input 
              id="firstName" 
              placeholder="Enter your first name" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-primary dark:text-secondary">Last Name</Label>
            <Input 
              id="lastName" 
              placeholder="Enter your last name" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary dark:text-secondary">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-primary dark:text-secondary">Phone</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="Enter your phone number" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-primary dark:text-secondary">Username</Label>
            <Input 
              id="username" 
              placeholder="Choose a username" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-primary dark:text-secondary">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Choose a password" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
        </div>
      );
    default:
      return <div>Unknown step</div>;
  }
};

export default DummyContent;
