import { NextRequest, NextResponse } from 'next/server';
import connectdb from '@/lib/dbconnect';
import Usermodel from '@/model/User.model';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectdb();

  const { id } = params;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ success: false, message: 'Invalid message ID' }, { status: 400 });
  }

  try {
    const user = await Usermodel.findOneAndUpdate(
      { 'messages._id': id },
      { $pull: { messages: { _id: id } } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405, headers: { Allow: 'DELETE' } });
}