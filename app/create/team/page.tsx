import cover from '@/public/team.png'
import Image from 'next/image';
import CreateTeamForm from './CreateTeamForm';

export default function CreateTeamPage() {
    return (
        <div className='min-h-[calc(100vh-64px)] mb-12'>
            <div className='flex flex-col items-center m-0 min-h-[calc(100vh-64px)] justify-center'>
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure><Image src={cover} alt="Album" width={400} height={400}/></figure>
                    <div className="card-body flex justify-center">
                        <CreateTeamForm />
                    </div>
                </div>
            </div>
        </div>
    );
}