export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ShopMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
