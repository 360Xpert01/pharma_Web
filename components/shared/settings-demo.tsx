import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettings } from "@/context/settings-context";
import LoaderOverlay from "@/components/shared/loader-overlay";

export const SettingsDemo: React.FC = () => {
  const { settings, formatDate, formatAmount, getNextInvoiceNumber, getNextEstimateNumber } =
    useSettings();

  if (!settings) {
    return <LoaderOverlay isLoading={true} />;
  }

  const sampleDate = new Date();
  const sampleAmount = 1234567.89;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Settings Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold">Company Information</h3>
            <p>
              <strong>Business Name:</strong> {settings.businessName}
            </p>
            <p>
              <strong>Email:</strong> {settings.email}
            </p>
            <p>
              <strong>Phone:</strong> {settings.phone}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Formatting Examples</h3>
            <p>
              <strong>Date Format:</strong> {settings.dateFormat}
            </p>
            <p>
              <strong>Formatted Date:</strong> {formatDate(sampleDate)}
            </p>
            <p>
              <strong>Formatted Date with Time:</strong> {formatDate(sampleDate, "datetime")}
            </p>

            <p>
              <strong>Currency:</strong> {settings.currency} ({settings.currencySymbol})
            </p>
            <p>
              <strong>Formatted Amount:</strong> {formatAmount(sampleAmount)}
            </p>
            <p>
              <strong>Formatted Amount with Suffix:</strong>{" "}
              {formatAmount(sampleAmount, { suffix: true })}
            </p>
            <p>
              <strong>VAT Rate:</strong> {settings.vatTax}%
            </p>
            <p>
              <strong>VAT Amount:</strong>{" "}
              {formatAmount((sampleAmount * (settings.vatTax || 20)) / 100)}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Document Numbers</h3>
            <p>
              <strong>Next Invoice:</strong> {getNextInvoiceNumber()}
            </p>
            <p>
              <strong>Next Estimate:</strong> {getNextEstimateNumber()}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Bank Details</h3>
            {settings.bankDetail ? (
              <div>
                <p>
                  <strong>Bank:</strong> {settings.bankDetail.bankName}
                </p>
                <p>
                  <strong>Account:</strong> {settings.bankDetail.accountTitle}
                </p>
                <p>
                  <strong>Account Number:</strong> {settings.bankDetail.accountNumber}
                </p>
              </div>
            ) : (
              <p>No bank details configured</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
