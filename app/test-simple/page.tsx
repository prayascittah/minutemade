"use client";
import { useState, useEffect } from "react";
import {
  authService,
  servicesService,
  transcriptionService,
  eventsService,
  utilityService,
} from "../../lib/simple-database";

export default function SimpleTestPage() {
  const [status, setStatus] = useState("Testing...");
  const [results, setResults] = useState<any>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    const testResults: any = {};

    try {
      // Test 1: Database Connection
      setStatus("Testing database connection...");
      const { connected, error } = await utilityService.testConnection();
      testResults.connection = { connected, error: error?.toString() };

      // Test 2: Check Tables
      setStatus("Checking tables...");
      const tableStatus = await utilityService.checkTables();
      testResults.tables = tableStatus;

      // Test 3: Get Available Services
      setStatus("Testing services...");
      const { data: services, error: servicesError } =
        await servicesService.getAvailableServices();
      testResults.services = {
        data: services,
        error: servicesError?.message,
        count: services?.length || 0,
      };

      // Test 4: Database Stats
      setStatus("Getting database stats...");
      const stats = await utilityService.getDatabaseStats();
      testResults.stats = stats;

      // Test 5: Current User
      setStatus("Checking authentication...");
      const { user, error: userError } = await authService.getCurrentUser();
      testResults.auth = { user: user?.email, error: userError?.message };
      setUser(user);

      setResults(testResults);
      setStatus("All tests completed!");
    } catch (err: any) {
      setStatus(`Error: ${err?.message || "Unknown error"}`);
    }
  };

  const testTranscription = async () => {
    if (!user) {
      alert("Please sign in first");
      return;
    }

    try {
      const { data, error } = await transcriptionService.saveTranscription(
        user.id,
        "test-chat-123",
        "Check my Gmail for today's meetings"
      );

      if (error) {
        alert(`Transcription error: ${error.message}`);
      } else {
        alert("Transcription saved successfully!");
        runTests(); // Refresh stats
      }
    } catch (err: any) {
      alert(`Error: ${err?.message || "Unknown error"}`);
    }
  };

  const testEvent = async () => {
    if (!user) {
      alert("Please sign in first");
      return;
    }

    try {
      const { data, error } = await eventsService.createEvent({
        user_id: user.id,
        title: "Test Meeting from Gmail",
        description: "AI extracted this from your Gmail",
        priority: "high",
        status: "todo",
        event_begin: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        event_end: new Date(Date.now() + 90000000).toISOString(), // Tomorrow + 1 hour
        service_id: 1, // Gmail service ID
      });

      if (error) {
        alert(`Event error: ${error.message}`);
      } else {
        alert("Event created successfully!");
        runTests(); // Refresh stats
      }
    } catch (err: any) {
      alert(`Error: ${err?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Schema Test Results</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status: {status}</h2>

          {/* Connection Status */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">🔗 Database Connection</h3>
            <div
              className={`p-3 rounded ${
                results.connection?.connected
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {results.connection?.connected ? "✅ Connected" : "❌ Failed"}
              {results.connection?.error && (
                <p>Error: {results.connection.error}</p>
              )}
            </div>
          </div>

          {/* Tables Status */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">📋 Tables Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(results.tables || {}).map(([table, exists]) => (
                <div
                  key={table}
                  className={`p-3 rounded ${
                    exists
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {exists ? "✅" : "❌"} {table}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">🛠️ Available Services</h3>
            <div className="bg-blue-50 p-4 rounded">
              <p>Found {results.services?.count || 0} services</p>
              {results.services?.data?.map((service: any) => (
                <div key={service.id} className="mt-2">
                  <strong>{service.title}</strong>: {service.description}
                </div>
              ))}
              {results.services?.error && (
                <p className="text-red-600">Error: {results.services.error}</p>
              )}
            </div>
          </div>

          {/* Database Stats */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">📊 Database Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(results.stats || {}).map(([table, count]) => (
                <div key={table} className="bg-gray-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {count as number}
                  </div>
                  <div className="text-sm text-gray-600">{table}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Authentication */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">🔐 Authentication</h3>
            <div
              className={`p-3 rounded ${
                user
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {user
                ? `✅ Signed in as: ${results.auth?.user}`
                : "⚠️ Not signed in"}
              {results.auth?.error && <p>Error: {results.auth.error}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={runTests}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              🔄 Re-run Tests
            </button>

            {user && (
              <>
                <button
                  onClick={testTranscription}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  🎤 Test Transcription
                </button>

                <button
                  onClick={testEvent}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  📅 Test Event Creation
                </button>
              </>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">📝 Next Steps</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600">✅</span>
              <span>
                <strong>Step 1:</strong> Run the new simple-schema.sql in
                Supabase SQL Editor
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600">✅</span>
              <span>
                <strong>Step 2:</strong> Check all tables are created (should
                show ✅ above)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">🔄</span>
              <span>
                <strong>Step 3:</strong> Test with authentication (sign
                up/login)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">🔄</span>
              <span>
                <strong>Step 4:</strong> Test transcription and event creation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
