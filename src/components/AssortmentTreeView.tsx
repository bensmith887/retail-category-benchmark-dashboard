import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Package, Folder, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface CategoryNode {
  id: string;
  name: string;
  competitor: string;
  count: number;
  children?: CategoryNode[];
}

interface AssortmentTreeViewProps {
  data: CategoryNode[];
  onSelectCategory: (category: CategoryNode) => void;
}

export const AssortmentTreeView: React.FC<AssortmentTreeViewProps> = ({ data, onSelectCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = searchTerm.trim() === '' 
    ? data 
    : filterTree(data, searchTerm.toLowerCase());
  
  function filterTree(nodes: CategoryNode[], term: string): CategoryNode[] {
    return nodes
      .map(node => {
        const matches = node.name.toLowerCase().includes(term);
        
        const filteredChildren = node.children 
          ? filterTree(node.children, term)
          : undefined;
        
        if (matches || (filteredChildren && filteredChildren.length > 0)) {
          return {
            ...node,
            children: filteredChildren && filteredChildren.length > 0 
              ? filteredChildren 
              : node.children
          };
        }
        
        return null;
      })
      .filter(Boolean) as CategoryNode[];
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-3">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="overflow-auto flex-grow">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <TreeNode 
              key={item.id} 
              node={item} 
              onSelectCategory={onSelectCategory} 
              level={0}
              searchTerm={searchTerm}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No categories found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

interface TreeNodeProps {
  node: CategoryNode;
  level: number;
  onSelectCategory: (category: CategoryNode) => void;
  searchTerm: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, onSelectCategory, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(level < 1 || searchTerm.trim() !== '');
  const hasChildren = node.children && node.children.length > 0;
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  const handleSelect = () => {
    onSelectCategory(node);
  };
  
  const competitorColors: Record<string, string> = {
    "Your Brand": "bg-purple-500",
    "Amazon": "bg-amber-500",
    "Walmart": "bg-blue-600",
    "Target": "bg-red-600",
    "eBay": "bg-red-500",
    "Best Buy": "bg-blue-500"
  };
  
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    
    const regex = new RegExp(`(${highlight.trim()})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <span key={i} className="bg-yellow-200 rounded">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };
  
  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-1.5 px-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors",
          level > 0 && "ml-5"
        )}
        onClick={handleSelect}
      >
        <div className="mr-1 w-5 flex items-center" onClick={handleToggle}>
          {hasChildren && (
            isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
        </div>
        
        {hasChildren ? (
          <Folder size={16} className="mr-2 text-gray-500" />
        ) : (
          <Package size={16} className="mr-2 text-gray-500" />
        )}
        
        <span className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
          {highlightText(node.name, searchTerm)}
        </span>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs h-5 font-normal">
            {node.count}
          </Badge>
          <div 
            className={cn("w-2 h-2 rounded-full", competitorColors[node.competitor] || "bg-gray-500")}
            title={`Primary competitor: ${node.competitor}`}
          ></div>
        </div>
      </div>
      
      {isExpanded && hasChildren && (
        <div className="ml-4">
          {node.children!.map((child) => (
            <TreeNode 
              key={child.id} 
              node={child} 
              level={level + 1}
              onSelectCategory={onSelectCategory}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};
