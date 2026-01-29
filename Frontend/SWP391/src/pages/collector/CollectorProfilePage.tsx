import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const CollectorProfilePage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account details.</p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Name" defaultValue="Collector One" />
          <Input label="Email" defaultValue="collector@platform.example" />
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="button">Save</Button>
        </div>
      </Card>
    </div>
  );
};

