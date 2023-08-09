import CreateProjectForm from "./CreateProjectForm";

export default function CreateProjectPage() {
	return (
		<div>
			<h1>Create Project</h1>
			<div className="card lg:card-side bg-base-100 shadow-xl">
				<figure><img src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
				<div className="card-body">
					<CreateProjectForm />
				</div>
			</div>
		</div>
	);
}