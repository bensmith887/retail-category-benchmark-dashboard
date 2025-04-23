
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getApiKeyStatus } from "@/services/assortmentApi";

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = React.useState('');
  const { toast } = useToast();
  const apiKeyStatus = getApiKeyStatus();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    onApiKeySubmit(apiKey);
    setApiKey(''); // Clear the input after submitting
    toast({
      title: "API Key Updated",
      description: "The API key has been successfully updated",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 items-center">
      <Input
        type="password"
        placeholder={apiKeyStatus.isSet ? "API Key is set (enter to update)" : "Enter API Key"}
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="max-w-md"
      />
      <Button type="submit" variant="outline" size="default">
        {apiKeyStatus.isSet ? "Update API Key" : "Set API Key"}
      </Button>
    </form>
  );
};

export default ApiKeyInput;
