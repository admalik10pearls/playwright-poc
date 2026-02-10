/**
 * Pet model returned by the Petstore API.
 */
export type Pet = {
  id: number;
  name: string;
  status: 'available' | 'pending' | 'sold';
  category?: { id: number; name: string };
  tags?: { id: number; name: string }[];
  photoUrls?: string[];
};
